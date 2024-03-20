import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BlogRead = ({blog}) => {
  const { authUser } = useAuthContext();
  const [authorimage, setauthorimage] = useState("https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D")

  const formattedDate = new Date(blog.createdAt).toLocaleString("en-IN", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });

  return (
    <div className="w-full md:w-[32%] border-4 border-purple-800 rounded-lg">
      <div className="w-full h-[60vh] bg-sky-500 relative">
        <div className="w-full h-full">
          <img
            className="w-full h-full object-cover"
            src={blog?.coverImage}
            alt="coverImage"
          />
        </div>
        <div className="absolute bottom-1  p-3 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-slate-100 font-semibold">{formattedDate}</p>
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 object-cover rounded-full"
                src={blog?.author?.profilePic || authorimage}
                alt=""
              />
              <span className=" text-sm text-slate-400 capitalize font-semibold">{blog.author.fullname}</span>
            </div>
          </div>
          <Link to={`/read/${blog._id}`}>
          <h1 className="font-semibold text-slate-200 hover:text-blue-500 cursor-pointer hover:underline">
                {blog?.title}
          </h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogRead;
