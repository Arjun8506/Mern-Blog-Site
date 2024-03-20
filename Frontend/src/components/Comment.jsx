import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { MdDelete } from "react-icons/md";

const Comment = ({ comment }) => {
  const { authUser } = useAuthContext();
  const [authorimage, setauthorimage] = useState("https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")

  const [loading, setloading] = useState(false);
  const [errorgot, seterrorgot] = useState(null);

  const formattedDate = new Date(comment.createdAt).toLocaleString("en-IN", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleDeleteComment = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/comment/delete/${comment._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json()
      if (data.success === false) {
        setloading(false)
        seterrorgot(data.message)
        return
      }
      setloading(false)
      seterrorgot(null)
      console.log(data);

    } catch (error) {
      setloading(false);
      seterrorgot(error.message);
    }
  };

  return (
    <div className="w-[80%] mx-auto lg:w-[60%] h-[15vh] md:min-h-[30vh] rounded-md bg-purple-100 p-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1 mb-2 md:mt-4">
          <img
            className="w-4 h-4 object-cover rounded-full"
            src={comment.user?.profilePic || authorimage}
            alt=""
          />
          <span className=" text-[1.6vw] text-slate-400 capitalize font-semibold">
            {comment.user?.fullname}
          </span>
        </div>
        <p className="text-[1.6vw] text-slate-900 font-semibold">
          {formattedDate}
        </p>
      </div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-[2vw] text-black">
          {comment.comment}
        </h1>

        {authUser && comment.user && authUser._id === comment.user._id ? (
          <div className="text-lg flex gap-2 text-slate-500">
            <MdDelete onClick={() => handleDeleteComment()} className="text-red-500 cursor-pointer" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
