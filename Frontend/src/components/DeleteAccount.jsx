import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const DeleteAccount = () => {

  const {authUser, setauthUser} = useAuthContext()
  const [errorgot, seterrorgot] = useState(null)
  const [loading, setloading] = useState(false)

  const handleDeleteUser = async () => {
    try {
      setloading(true)
      const res = await fetch(`/api/auth/delete/${authUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      const data = await res.json()
      if(data.success === false) {
        seterrorgot(data.message)
        return
      }
      setloading(false)
      seterrorgot(null)
      localStorage.removeItem("chat-user")
      setauthUser(null)
      alert(data.message)
      navigate("/")      
      
    } catch (error) {
      seterrorgot(error.message)
      setloading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={() => handleDeleteUser()}
      className="bg-red-500 disabled:opacity-50 px-2 py-2 border-2 border-red-600 rounded-lg hover:opacity-70 text-white"
      disabled= {loading} 
    >
      {loading ? "Loading...." : "Delete Account"}
      
    </button>
  );
};

export default DeleteAccount;
