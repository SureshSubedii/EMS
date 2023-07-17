import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/userManagement.css';

function UsersManagement() {
  const [users,setUsers]=useState([]);

  useEffect(()=>{
  axios.get("http://192.168.18.177:5000/api/v1/user/manageUser").then(data=>{
    console.log(data.data)
    setUsers(data.data)
  } )
  .catch(err=>alert(err))

  },[])
  return (
    <div className="usersManagement">
      <table border={1} className="tableList">
        <tbody>

        <tr>
        <th>S.N</th>
        <th>List Of registered users</th>


        </tr>
      {users?.map((user,index)=>(
        <tr key={user._id}>
          <td>{index+1}.</td>
          <td>{user.email}</td>
        </tr>
    
     )) }
        </tbody>

      </table>


    </div>
  )
}

export default UsersManagement