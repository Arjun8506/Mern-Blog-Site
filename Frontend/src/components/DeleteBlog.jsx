import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ blogId }) => {
  const [errorgot, seterrorgot] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const deleteBlog = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/blog/delete/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorgot(data.message);
        return;
      }
      setloading(false);
      seterrorgot(null);
      alert(data.message);
      navigate("/")
    } catch (error) {
      seterrorgot(error.message);
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => deleteBlog()}
        className="bg-red-600 py-2 px-2 rounded-lg font-bold uppercase hover:opacity-75"
      >
        Delete Blog
      </button>
      {errorgot ? (
        <p className="text-[1.8vw] text-red-700 text-center">{errorgot}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default DeleteBlog;
