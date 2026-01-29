import users from "../models/userSchema.js";
import moment from "moment";
import { createObjectCsvWriter } from "csv-writer";
// 1. Register User
export const userpost = async (req, res) => {
    console.log("userpost")
    const { firstname, lastname, email, mobile, gender, status, location } = req.body;
    const file = req.file ? req.file.filename : "";

    if (!firstname || !lastname || !email || !mobile || !gender || !status || !file || !location) {
        return res.status(401).json({ error: "All fields are required" });
    }

    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            res.status(401).json({ error: "This user already exists" });
        } else {
            const userData = new users({
                firstname, lastname, email, mobile, gender, status, profile: file, location, datecreated: moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
    }
};

// 2. Get Users (With Search & Pagination)
export const getUsers = async (req, res) => {
    console.log("getUser")
    const search = req.query.search || "";
    const page = req.query.page || 1;
    const ITEM_PER_PAGE = 5;

    const query = {
        firstname: { $regex: search, $options: "i" }
    };

    try {
        const count = await users.countDocuments(query);
        const usersdata = await users.find(query)
            .sort({ datecreated: -1 }) // Show newest first
            .limit(ITEM_PER_PAGE)
            .skip((page - 1) * ITEM_PER_PAGE);

        res.status(200).json({
            Pagination: {
                count,
                pageCount: Math.ceil(count / ITEM_PER_PAGE)
            },
            usersdata
        });
    } catch (error) {
        res.status(401).json(error);
    }
};

// 3. Get Single User
export const getSingleUser = async (req, res) => {
    console.log("getSingleUser")
    const { id } = req.params;
    try {
        const userindividual = await users.findById({ _id: id });
        res.status(200).json(userindividual);
    } catch (error) {
        res.status(422).json(error);
    }
};

// 4. Update User
export const updateUser = async (req, res) => {
    console.log("UpdateUser")
    const { id } = req.params;
    const { firstname, lastname, email, mobile, gender, status, location, user_profile } = req.body;
    
    // Check if a new file was uploaded, otherwise use the old profile string
    const file = req.file ? req.file.filename : user_profile; 

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            firstname, lastname, email, mobile, gender, status, profile: file, location
        }, { new: true });
        
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(422).json(error);
    }
};

// 5. Delete User
export const deleteUser = async (req, res) => {
    console.log("deleteUser")
    const { id } = req.params;
    try {
        const deleteuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deleteuser);
    } catch (error) {
        res.status(422).json(error);
    }
};

// 6. Export to CSV
export const userExport = async (req, res) => {
    console.log("exportCSV")
    try {
        const usersdata = await users.find();
        
        const csvWriter = createObjectCsvWriter({
            path: 'users.csv',
            header: [
                { id: 'firstname', title: 'FirstName' },
                { id: 'lastname', title: 'LastName' },
                { id: 'email', title: 'Email' },
                { id: 'mobile', title: 'Mobile' },
                { id: 'gender', title: 'Gender' },
                { id: 'status', title: 'Status' },
                { id: 'profile', title: 'ProfileImage' },
                { id: 'location', title: 'Location' },
                { id: 'datecreated', title: 'Date Created' }
            ]
        });

        await csvWriter.writeRecords(usersdata);
        res.download('users.csv');
    } catch (error) {
        res.status(401).json(error);
    }
};

export const userstatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const userstatusupdate = await users.findByIdAndUpdate({ _id: id }, { status: status }, { new: true });
        res.status(200).json(userstatusupdate);
    } catch (error) {
        res.status(401).json(error);
    }
}