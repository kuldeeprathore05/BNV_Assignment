import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Edit = () => {
  const [inputdata, setInputData] = useState({
    firstname: "", lastname: "", email: "", mobile: "", gender: "", location: ""
  });
  const [status, setStatus] = useState("Active");
  const [imgdata, setImgdata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const { id } = useParams("");
  const navigate = useNavigate();

  // 1. Fetch User Data to Populate Form
  const getuser = async () => {
    const res = await axios.get(`https://bnv-assignment.onrender.com/api/getuser/${id}`);
    if (res.status === 200) {
      setInputData(res.data);
      setStatus(res.data.status);
      setImgdata(res.data.profile);
    } else {
      console.log("error");
    }
  }

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  }

  const setProfile = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  }

  const submitUserData = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, mobile, gender, location } = inputdata;

    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("user_profile", imgdata); 
    data.append("profile", image || imgdata); 
    data.append("location", location);

    const config = { headers: { "Content-Type": "multipart/form-data" } }
    
    const res = await axios.put(`https://bnv-assignment.onrender.com/api/updateuser/${id}`, data, config);
    if (res.status === 200) {
      toast.success("User Updated Successfully");
      setTimeout(() => { navigate("/") }, 2000);
    }
  }

  useEffect(() => {
    getuser();
  }, [])

  return (
    <div className='container mt-3'>
      <h2 className='text-center mt-1'>Update User Details</h2>
      <Card className='shadow mt-3 p-3'>
        <div className='profile_div text-center'>
          <img src={preview ? preview : `https://bnv-assignment.onrender.com/uploads/${imgdata}`} alt="img" style={{ maxWidth: "50px", borderRadius: "50%" }} />
        </div>
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='firstname' value={inputdata.firstname} onChange={setInputValue} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='lastname' value={inputdata.lastname} onChange={setInputValue} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' value={inputdata.email} onChange={setInputValue} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name='mobile' value={inputdata.mobile} onChange={setInputValue} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Gender</Form.Label>
              <Form.Check type={"radio"} label={`Male`} name="gender" value={"Male"} checked={inputdata.gender === "Male"} onChange={setInputValue} />
              <Form.Check type={"radio"} label={`Female`} name="gender" value={"Female"} checked={inputdata.gender === "Female"} onChange={setInputValue} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Status</Form.Label>
              <Select defaultValue={status} onChange={(e) => setStatus(e.value)} options={[{ value: 'Active', label: 'Active' }, { value: 'InActive', label: 'InActive' }]} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Profile</Form.Label>
              <Form.Control type="file" name='user_profile' onChange={setProfile} />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Enter Your Location</Form.Label>
              <Form.Control type="text" name='location' value={inputdata.location} onChange={setInputValue} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={submitUserData}>Update</Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  )
}

export default Edit