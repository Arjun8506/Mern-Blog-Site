import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setformData] = useState({});
  const [errorgot, seterrorgot] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return seterrorgot("password must be 6 characters at least")
    }

    try {
      setloading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json()
      setloading(false)
      seterrorgot(data.message)
      alert(data)
      navigate("/login")
    } catch (error) {
      seterrorgot(error.message)
      setloading(false)
    }
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="w-[100%] md:w-[50%] py-12 mx-auto">
        <h1 className="uppercase font-extrabold text-lg md:text-2xl text-center mb-4 ">
          Register yourself to create your own blogs
        </h1>
        <form
          className="w-[100%] flex flex-col mx-auto gap-5 items-center px-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="text"
            id="fullname"
            placeholder="FullName"
            value={formData.fullname}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="text"
            id="username"
            placeholder="UserName"
            value={formData.username}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="email"
            id="email"
            placeholder="User Email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          <button
            className="w-full md:w-[100%] bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
            disabled = {loading}
          >
            {loading ? "Loading...." : "Register"}
          </button>

          {errorgot ? <p className="text-red-700 text-center">{errorgot}</p>: ""}

          <p>
            Already Have an account
            <Link
              to={"/login"}
              className="capitalize ml-2 text-blue-400 underline hover:text-yellow-300"
            >
              Go to login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
