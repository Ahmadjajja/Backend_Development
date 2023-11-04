import React, { useEffect, useState } from "react";
import axios from "axios";
function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users")
      .then((response) => {
        console.log("response : ", response.data);
        setUsersData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  }, []);

  const handleDelete = (userId) => {
    axios
      .delete("http://localhost:8000/deleteUser/" + userId)
      .then((response) => {
        console.log("response : ", response);
        const updateData = usersData.filter((user) => user._id != userId);
        setUsersData(updateData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error : ", error);
      });
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col text-center fw-bold">Name</div>
          <div className="col text-center fw-bold">Age</div>
          <div className="col text-center fw-bold">Email</div>
          <div className="col text-center fw-bold">Actions</div>
        </div>
        {isLoading ? (
          <>
            <h1 className="text-center">Loading...</h1>
          </>
        ) : (
          usersData.map((user) => (
            <div className="row mt-1" key={user._id}>
              <div className="col text-center ">{user.name}</div>
              <div className="col text-center ">{user.age}</div>
              <div className="col text-center ">{user.email}</div>
              <div className="col text-center ">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
                <button className="ms-1 btn btn-primary">Update</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users;
