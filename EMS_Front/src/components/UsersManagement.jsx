import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import "../styles/userManagement.css";
import { useSelector } from "react-redux";
import { checkUser } from "../stateManagement/userSlice";
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net-dt';
import { useRef } from "react";


function UsersManagement() {
  const [users, setUsers] = useState([]);
  const user = useSelector(checkUser)
  const userTableRef = useRef(null);


  const deleteUSer = (uid) => {
    const ans = window.confirm("Are you sure?");
    if (ans) {
      axios
        .delete(
          `user/manageUser/deleteUSer/${uid}`,
          {
            headers: {
              "Authorization":`Bearer ${user}`
            }
          }
        )
        .then((response) => {
          alert(response.data.success);
          window.location.reload();
        })
        .catch((err) => {
          if (err.response && err.response.data && err.response.data.error) {
            alert(err.response.data.error);
          } else {
            alert(err.message);
          }
        });
    }
  };

  useEffect(() => {
 
      axios
      .get("user/manageUser",
      {
        headers: {
          "Authorization":`Bearer ${user}`
        }
      }
      )
      .then((response) => {
        setUsers(response.data);
        if (userTableRef.current) {
          $(userTableRef.current).DataTable();
        }
      })
      .catch(() => toast.error("Error in fetching users"));
  }, []);
  return (
    <div className="usersManagement">
      <h1> List of registered users</h1>
      <table  className="tableList"  ref = {userTableRef}>
        <thead>
        <tr>
            <th>S.N</th>
            <th> Username</th>
            <th> Email</th>
            <th> contact</th>
            <th> Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}.</td>
              <td>{user.name} </td>
              <td>{user.email} </td>
              <td>{user.contact} </td>
              <td>{user.address} </td>
              <td onClick={() => deleteUSer(user._id)}>
                <DeleteForeverIcon />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersManagement;
