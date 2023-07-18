import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/userManagement.css';

function UsersManagement() {
  const [users,setUsers]=useState([]);

  const deleteUSer=()=>{
    
  }

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
        <th>Action</th>


        </tr>
      {users?.map((user,index)=>(
        <tr key={user._id}>
          <td>{index+1}.</td>
          <td>{user.email} </td>
          <td onClick={deleteUSer}><DeleteForeverIcon/></td>
        </tr>
    
     )) }
        </tbody>

      </table>


    </div>
  )
}

export default UsersManagement