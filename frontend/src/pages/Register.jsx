import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select'; 
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [inputdata, setInputData] = useState({
    firstname: "", lastname: "", email: "", mobile: "", gender: "", location: ""
  });
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value });
  };

  const setProfile = (e) => {
    setImage(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const submitUserData = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, mobile, gender, location } = inputdata;

    if (!firstname || !lastname || !email || !mobile || !gender || !image || !location) {
      toast.error("All fields are required!");
      return;
    }

    const data = new FormData();
    data.append("firstname", firstname);
    data.append("lastname", lastname);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("gender", gender);
    data.append("status", status);
    data.append("profile", image);
    data.append("location", location);

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axios.post("https://bnv-assignment.onrender.com/api/register", data, config);

    if (res.status === 200) {
      toast.success("User Registered Successfully");
      navigate("/");
    } else {
      toast.error("Error Registration");
    }
  };

  return (
    <div className='container mt-3'>
      <h2 className='text-center mt-1'>Register Your Details</h2>
      <Card className='shadow mt-3 p-3'>
        <div className='profile_div text-center'>
          <img src={preview ? preview : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDM3hN-VCNh90Pop53o8bQ1L_W8kn4LhZf7Q&s"} alt="img" style={{ maxWidth: "50px" }} />
        </div>
        <Form>
          <Row>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name='firstname' onChange={setInputValue} placeholder="Enter FirstName" />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name='lastname' onChange={setInputValue} placeholder="Enter LastName" />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name='email' onChange={setInputValue} placeholder="Enter Email" />
            </Form.Group>
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Mobile</Form.Label>
              <Form.Control type="text" name='mobile' onChange={setInputValue} placeholder="Enter Mobile" />
            </Form.Group>
            
            {/* Gender Radio Buttons [cite: 100] */}
            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Gender</Form.Label>
              <Form.Check type={"radio"} label={`Male`} name="gender" value={"Male"} onChange={setInputValue} />
              <Form.Check type={"radio"} label={`Female`} name="gender" value={"Female"} onChange={setInputValue} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Status</Form.Label>
              <Select options={[{ value: 'Active', label: 'Active' }, { value: 'InActive', label: 'InActive' }]} onChange={(e) => setStatus(e.value)} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Select Your Profile</Form.Label>
              <Form.Control type="file" name='user_profile' onChange={setProfile} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6">
              <Form.Label>Enter Your Location</Form.Label>
              <Form.Control type="text" name='location' onChange={setInputValue} placeholder="Enter Your Location" />
            </Form.Group>
            
            <Button variant="primary" type="submit" onClick={submitUserData}>Submit</Button>
          </Row>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default Register;