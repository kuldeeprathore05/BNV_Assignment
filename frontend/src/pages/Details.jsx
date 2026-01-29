import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getuser = async () => {
    const res = await axios.get(`http://localhost:6005/api/getuser/${id}`);
    if (res.status === 200) {
      setUser(res.data);
    }
  }

  useEffect(() => {
    getuser();
  }, [])

  return (
    <div className="container mt-3">
      <h1 style={{ fontWeight: 400 }}>Welcome {user.firstname}</h1>
      <Card className='shadow col-lg-6 mx-auto mt-5'>
        <Card.Body>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img
                src={`http://localhost:6005/uploads/${user.profile}`}
                alt="profile"
                style={{ width: 50, borderRadius: '50%' }}
                onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop if fallback fails
                    e.target.src = 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png';
                }}
                />
              <h3 className='mt-3'>Name: <span >{user.firstname} {user.lastname}</span></h3>
              <h3 className='mt-3'>Age: <span >25</span></h3>
              <p className='mt-3'><i className="fa-solid fa-envelope"></i> Email: <span>{user.email}</span></p>
              <p className='mt-3'><i className="fa-solid fa-mobile-screen"></i> Mobile: <span>{user.mobile}</span></p>
              <p className='mt-3'><i className="fa-solid fa-location-dot"></i> Location: <span>{user.location}</span></p>
            </div>
            <div className="right_view  col-lg-6 col-md-6 col-12">
               <p className='mt-5'><i className="fa-solid fa-mobile-screen"></i> Gender: <span>{user.gender}</span></p>
               <p className='mt-3'><i className="fa-solid fa-location-dot"></i> Status: <span>{user.status}</span></p>
               <p className='mt-3'>Description: <span>Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></p>
            </div>
          </div>
          <div className='mt-3'>
             <Button className='me-2' onClick={()=>navigate(`/edit/${user._id}`)}>Edit</Button>
             <Button variant='danger' onClick={()=>navigate('/')}>Close</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Details