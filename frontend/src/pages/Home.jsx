import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const navigate = useNavigate();

  const getUsers = async () => {
    const res = await axios.get(`http://localhost:6005/api/getusers?search=${search}&page=${page}`);
    if (res.status === 200) {
      setUsers(res.data.usersdata);
      setPageCount(res.data.Pagination.pageCount);
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`http://localhost:6005/api/deleteuser/${id}`);
    if(res.status === 200){
      toast.success("User Deleted Successfully");
      getUsers();
    }
  };

  const exportCsv = () => {
    window.open("http://localhost:6005/api/exportcsv", "_blank");
  }

  useEffect(() => {
    getUsers();
  }, [search, page]);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <div className='search_add mt-4 d-flex'>
           <Form.Control 
              type="text" 
              placeholder="Search" 
              className="me-2"
              onChange={(e)=>setSearch(e.target.value)} 
           />
           <Button variant="primary" onClick={()=>navigate('/register')}>+ Add User</Button>
        </div>
        <Button variant="success" className='mt-4' onClick={exportCsv}>Export To Csv</Button>
      </div>

      <Table striped bordered hover responsive>
        <thead className='thead-dark'>
          <tr>
            <th>ID</th>
            <th>FullName</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Profile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? users.map((element, index) => (
            <tr key={index}>
              <td>{index + 1 + ((page - 1) * 5)}</td>
              <td>{element.firstname} {element.lastname}</td>
              <td>{element.email}</td>
              <td>{element.gender}</td>
              <td>
  <Dropdown align="end">
    <Dropdown.Toggle 
      as="div" 
      style={{ 
        cursor: 'pointer', 
        fontSize: '14px', 
        display: 'inline-block' 
      }}
    >
      <span className={element.status === "Active" ? "badge bg-success" : "badge bg-danger"}>
        {element.status}
      </span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {["Active", "Inactive"].map((status) => (
        <Dropdown.Item 
          key={status} 
          onClick={async () => {
            if (status !== element.status) {
              try {
                const res = await axios.put(`http://localhost:6005/api/status/${element._id}`, { status });
                if(res.status === 200){
                  toast.success(`Status updated to ${status}`);
                  getUsers(); // refresh table
                }
              } catch(err) {
                toast.error("Failed to update status");
              }
            }
          }}
        >
          {status}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</td>

              <td >
                <img
                src={`http://localhost:6005/uploads/${element.profile}`}
                alt="profile"
                style={{ width: 25, borderRadius: '50%' }}
                onError={(e) => {
                    e.target.onerror = null; // prevent infinite loop
                    e.target.src = 'https://www.citypng.com/public/uploads/preview/hd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png';
                }}
                />
              </td>
              <td style={{ width: '40px', textAlign: 'center' }}>
                <Dropdown align="end">
                 <Dropdown.Toggle 
      as="div" 
      style={{ 
        cursor: 'pointer', 
        fontSize: '20px', 
        color: 'black', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '30px', 
        height: '30px' 
      }}
    >
      &#8942; {/* Vertical three dots */}
    </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={`/view/${element._id}`}>View</Dropdown.Item>
                    <Dropdown.Item as={Link} to={`/edit/${element._id}`}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={()=>handleDelete(element._id)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          )) : <tr><td colSpan="7" className='text-center'>No Data Found</td></tr>}
        </tbody>
      </Table>
       
      <div className='d-flex justify-content-end'>
        <Button disabled={page <= 1} onClick={()=>setPage(page-1)} className='me-2'>Previous</Button>
        <Button disabled={page >= pageCount} onClick={()=>setPage(page+1)}>Next</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;