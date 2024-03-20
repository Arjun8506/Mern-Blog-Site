import React, { useEffect, useState } from "react";
import BlogRead from "./BlogRead";

const BlogContainer = () => {
  const [allBlogs, setallBlogs] = useState([])
  const [loading, setloading] = useState(false);
  const [errorgot, seterrorgot] = useState(null);

  useEffect(() => {
    getAllBlogsInFrontend();
  }, []);

  const getAllBlogsInFrontend = async () => {
    try {
      setloading(true);
      const res = await fetch("/api/blog/AllBlogs");
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterrorgot(data.message);
        return;
      }
      setloading(false);
      seterrorgot(null);
      setallBlogs(data.Blogs)
    } catch (error) {
      setloading(false);
      seterrorgot(error.message);
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-5">
      {errorgot ? (
        <p className="text-center text-sm text-red-600">{errorgot}</p>
      ) : (
        ""
      )}
      {loading ? (
        "Loading...."
      ) : null}
      
      {allBlogs.map((blog) => (
        <BlogRead 
          key={blog._id}
          blog = {blog}
        />
      ))}

    </div>
  );
};

export default BlogContainer;
