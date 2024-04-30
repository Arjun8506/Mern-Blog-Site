import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SignOut = () => {
  const [errorgot, seterrorgot] = useState(null);
  const navigate = useNavigate()
  const {setauthUser} = useAuthContext()

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json()
      if(data.success === false) {
        seterrorgot(data.message)
        return
      }
      localStorage.removeItem("chat-user")
      setauthUser(null)
      alert(data.message)
        navigate("/")      
    } catch (error) {
      seterrorgot(error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={() => handleLogOut()}
      className="bg-red-500 px-2 py-2 border-2 text-white border-red-600 rounded-lg hover:opacity-70"
    >
      Sign Out
    </button>
  );
};

export default SignOut;
