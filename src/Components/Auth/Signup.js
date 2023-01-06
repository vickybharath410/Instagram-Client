import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
function Signup() {
    const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm();
  function onSubmit() {
    const { name, email, password } = details;
    axios
      .post("https://instagram-server-nine.vercel.app/api/user/signup", {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((e) => console.log(e));
  }
  return (
    <div className="authpart">
      <form className="signup" onSubmit={handleSubmit(onSubmit)}>
        <img
          className="logo"
          alt="logo"
          src="https://cdn-icons-png.flaticon.com/512/1384/1384886.png"
        />
        <input
          value={details.name}
          className="authinput"
          placeholder="Enter your name"
          type="text"
          {...register("name", {
            required: "* Please enter your name",
            minLength: {
              value: 5,
              message: "Name must be 5 letter",
            },
          })}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
        />

        {errors.name && <span className="error">{errors.name.message}</span>}
        <input
          value={details.email}
          className="authinput"
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: "* Please enter your Email",
          })}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />

        {errors.email && <span className="error">{errors.email.message}</span>}
        <input
          value={details.password}
          className="authinput"
          placeholder="Enter Password"
          type="text"
          {...register("password", {
            required: "* Please Set Password",
            minLength: {
              value: 8,
              message: "Password must be 8 letter",
            },
          })}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        />

        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}
        <input
          value={details.confirm}
          className="authinput"
          placeholder="Please confirm your password"
          type="text"
          {...register("confirm", {
            required: "* Please re-enter your Password",
            validate: (match) => {
              const password = getValues("password");
              return match === password || "Passwords should match!";
            },
          })}
          onChange={(e) => setDetails({ ...details, confirm: e.target.value })}
        />

        {errors.confirm && (
          <span className="error">{errors.confirm.message}</span>
        )}
        <button className="register">Signup</button>
      </form>
      <Link to="/">
        <span className="loginpath">Signin</span>
      </Link>
    </div>
  );
}

export default Signup;