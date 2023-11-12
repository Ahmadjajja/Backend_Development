import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const formDataInitialState = {
  email: "",
  password: "",
};
function Auth() {
  const [formData, setFormData] = useState(formDataInitialState);
  const [isRegister, setIsRegister] = useState(false);
  const [tokenValue, setTokenValue] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    axios
      .post("http://localhost:8000/auth/register", formData)
      .then((res) => {
        console.log("res.data : ", res.data);
        alert("User successfuly registered");
        setIsRegister(true);
        setFormData(formDataInitialState);
      })
      .catch((error) => {
        console.log("Error : ", error.message);
      });
  };
  const handleLogin = () => {
    axios
      .post("http://localhost:8000/auth/login", formData)
      .then((res) => {
        console.log("res.data : ", res.data);
        alert("User successfuly Loggedin!!");
        setIsRegister(false);
        setFormData(formDataInitialState);
        console.log("Token Payload : ", jwtDecode(res.data.token));
      })
      .catch((error) => {
        console.log("Error : ", error.message);
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row my-3">
          <div className="col-3"></div>
          <div className="col-6">
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter email"
            />
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6">
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter password"
            />
          </div>
          <div className="col-3"></div>
        </div>
        <div className="row my-3">
          <div className="col-3"></div>
          {!isRegister ? (
            <div className="col-6 text-center">
              <button className="btn btn-primary" onClick={handleRegister}>
                Register
              </button>
            </div>
          ) : (
            <div className="col-6 text-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
          <div className="col-3"></div>
        </div>
        <div className="row">
          <div className="col">
            <h1>
              {isRegister
                ? "User Registered : " + isRegister
                : "User Loggedin : " + !isRegister}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
