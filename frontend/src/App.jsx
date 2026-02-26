import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {

  const [users, setUsers] = useState([]);

  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [role, setRole] = useState('')


  function fetchUser(){
    axios.get('/api/user').then((res)=>{
      console.log(res.data);
      
      setUsers(res.data.user)
    })
  }

  const formHandler = (e)=>{
    e.preventDefault()

    const {username,email, contact, role} = e.target.elements

    console.log(username);

    axios.post("/api/user",{
      username: username.value,
      email: email.value,
      contact: contact.value,
      role: role.value
    }).then(res=>{
      fetchUser()
    })

    setUserName('')
    setEmail('')
    setContact('')
    setRole('')
    

  }

  

  useEffect(()=>{
    fetchUser()
  },[])


  const deleteHandler = (userId)=>{
    axios.delete('/api/user/'+userId).then(res=>{
      fetchUser()
    })
  }

  return (
    <div id="main">
      <div className="form-container">
        
        <form onSubmit={(e)=>{
          formHandler(e)

        }}>
          <h1>Create New User</h1>
          <div className="input-group">
            <p>Name</p>
            <input name="username" type="text" placeholder="Enter your name" value={username} onChange={(e)=>{
              setUserName(e.target.value)
            }} />
          </div>
          <div className="input-group">
            <p>E-mail</p>
            <input name="email" type="e-mail" placeholder="Enter your email" value={email} onChange={(e)=>{
              setEmail(e.target.value)
            }} />
          </div>
          <div className="input-group">
            <p>Contact No.</p>
            <input name="contact" type="number" placeholder="Enter your contact number" value={contact} onChange={(e)=>{
              setContact(e.target.value)
            }}/>
          </div>
          <div className="input-group">
            <p>Role</p>
            <input name="role" type="text" placeholder="Enter your role" value={role} onChange={(e)=>{
              setRole(e.target.value)
            }} />
          </div>
          <button>Create User</button>
        </form>
      </div>

      <div className="card-container">
        {
          users.map((user,idx)=>{
            return <div key={idx} className="card">
          <img src="https://images.unsplash.com/photo-1640951613773-54706e06851d?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          <div className="user-details">
            <h1>{user.username}</h1>
            <p className="role">{user.role}</p>
            <p>{user.email}</p>
            <p>{user.contact}</p>
            <button onClick={()=>{
              deleteHandler(user._id)
            }}>Delete</button>
          </div>
        </div>
          })
        }
      </div>
    </div>
  );
};

export default App;
