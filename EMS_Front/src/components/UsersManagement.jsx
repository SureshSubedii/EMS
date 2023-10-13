import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/userManagement.css";

function UsersManagement() {
  const [users, setUsers] = useState([]);

  const deleteUSer = (uid) => {
    const ans = window.confirm("Are you sure?");
    if (ans) {
      axios
        .delete(
          `http://localhost:5000/api/v1/user/manageUser/deleteUSer/${uid}`
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
      .get("http://localhost:5000/api/v1/user/manageUser")
      .then((response) => {
        setUsers(response.data);
      })
      .catch(() => alert("Error in fetching users"));
  }, []);
  return (
    <div className="usersManagement">
      <table border={1} className="tableList">
        <tbody>
          <tr>
            <th>S.N</th>
            <th>List Of registered users</th>
            <th>Action</th>
          </tr>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}.</td>
              <td>{user.email} </td>
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
