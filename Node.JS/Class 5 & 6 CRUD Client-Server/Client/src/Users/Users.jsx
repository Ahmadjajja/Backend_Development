import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";

const formDataInitialState = {
  name: "",
  age: 0,
  email: "",
  favouriteHobbies: [],
};
function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState(formDataInitialState);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleHobbiesChange = (e) => {
    setSelectedHobbies((selectedHobbies) => {
      if (e.target.checked) {
        if (!selectedHobbies.includes(e.target.value)) {
          return [...selectedHobbies, e.target.value];
        }
        return selectedHobbies;
      } else {
        if (selectedHobbies.includes(e.target.value)) {
          let tempArr = [];
          for (let index = 0; index < selectedHobbies.length; index++) {
            if (selectedHobbies[index] != e.target.value) {
              tempArr.push(selectedHobbies[index]);
            }
          }
          return tempArr;
        }
      }
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();

    formData.favouriteHobbies = selectedHobbies;

    axios
      .post("http://localhost:8000/addUser", formData)
      .then((response) => {
        console.log("User created successfully!!");
        console.log("response.data : ", response.data);
        setUsersData((usersData) => [...usersData, response.data]);
        setFormData(formDataInitialState);
        setSelectedHobbies([]);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };
  const handleUpdateUser = (e) => {
    e.preventDefault();

    formData.favouriteHobbies = selectedHobbies;
    console.log("formdata : ", formData);
    axios
      .put("http://localhost:8000/updateUser/" + formData._id, formData)
      .then((response) => {
        console.log("User updated successfully!!");
        console.log("response : ", response);

        const tempUsers = usersData.map((userData) => {
          return userData._id != formData._id ? userData : formData;
        });
        console.log("tempUsers : ", tempUsers);

        setUsersData(tempUsers);

        setFormData(formDataInitialState);
        setSelectedHobbies([]);
        setIsUpdate(false);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  const handleUpdate = (user) => {
    setFormData(user);
    setIsUpdate(true);
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Create user</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="input-group mb-3 w-50 mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-group mb-3 w-50 mx-auto">
              <input
                type="number"
                className="form-control"
                placeholder="age"
                aria-label="Userage"
                aria-describedby="basic-addon1"
                name="age"
                value={formData.age}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="input-group mb-3 w-50 mx-auto">
              <input
                type="email"
                className="form-control"
                placeholder="email"
                aria-label="Useremail"
                aria-describedby="basic-addon1"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-check w-50 mx-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value="Book Reading"
                id="flexCheckDefault"
                name="bookreading"
                onChange={(e) => handleHobbiesChange(e)}
              />
              <label className="form-check-label" for="flexCheckDefault">
                Book Reading
              </label>
            </div>
            <div className="form-check w-50 mx-auto">
              <input
                className="form-check-input"
                type="checkbox"
                value="Coin Collecting"
                id="flexCheckChecked"
                name="coincollecting"
                onChange={(e) => handleHobbiesChange(e)}
              />
              <label className="form-check-label" for="flexCheckChecked">
                Coin Collecting
              </label>
            </div>
            <div className="d-flex justify-content-center my-3">
              {isUpdate ? (
                <button className="btn btn-primary" onClick={handleUpdateUser}>
                  Update User
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleCreateUser}>
                  Create User
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h1 className="text-center">Read users data</h1>
          </div>
        </div>
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
                <button
                  className="ms-1 btn btn-primary"
                  onClick={() => handleUpdate(user)}
                >
                  Update
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Users;
