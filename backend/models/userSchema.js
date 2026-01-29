import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!value.includes("@")) {
                throw new Error("Invalid Email")
            }
        }
    },
    mobile: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    gender: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    datecreated: {
        type: Date,
        default: Date.now
    }
});

const users = mongoose.model("users", userSchema);
export default users;