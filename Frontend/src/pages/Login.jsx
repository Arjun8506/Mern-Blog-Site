import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [formData, setformData] = useState({});
  const [errorgot, seterrorgot] = useState(null);
  const [loading, setloading] = useState(false);
  const { setauthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return console.log("wrong credentials");
    }

    try {
      setloading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterrorgot(data.message);
        return;
      }
      console.log(data);
      setloading(false);

      localStorage.setItem("chat-user", JSON.stringify(data));
      setauthUser(data);

      alert("LoggedIn Successfully");
      navigate("/");
    } catch (error) {
      setloading(false);
      seterrorgot(error.message);
    }
  };

  return (
    <div className="w-full  ">
      <div className="w-[100%] md:w-[50%] py-12 mx-auto">
        <h1 className="uppercase font-extrabold text-lg md:text-2xl text-center mb-4">
          login yourself to create your own blogs
        </h1>
        <form
          className="w-[100%] flex flex-col mx-auto gap-5 items-center px-4"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-purple-600 px-1 py-2"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            className="w-full md:w-[100%] bg-purple-200 font-semibold py-2 px-4 border-2 border-purple-600 rounded-lg hover:text-purple-950 hover:font-bold hover:bg-purple-100 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Loading...." : "Login"}
          </button>

          {errorgot ? (
            <p className="text-red-700 text-center">{errorgot}</p>
          ) : (
            ""
          )}

          <p>
            Already Have an account
            <Link
              to={"/register"}
              className="capitalize ml-2 text-blue-400 underline hover:text-yellow-300"
            >
              Go to register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
