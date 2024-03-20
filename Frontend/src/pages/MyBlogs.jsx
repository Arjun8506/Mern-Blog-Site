import React, { useEffect, useState } from 'react'
import BlogRead from '../components/BlogRead';

const MyBlogs = () => {
  const [MyBlogs, setMyBlogs] = useState([])
  const [loading, setloading] = useState(false);
  const [errorgot, seterrorgot] = useState(null);

  useEffect(() => {
    getAllYoursBlogs()
  }, [])
  
  const getAllYoursBlogs = async () => {
    try {
        setloading(true);
        const res = await fetch("/api/blog/myblogs");
        const data = await res.json();
        if (data.success === false) {
          setloading(false);
          seterrorgot(data.message);
          return;
        }
        setloading(false);
        seterrorgot(null);
        setMyBlogs(data.MyBlogs)
      } catch (error) {
        setloading(false);
        seterrorgot(error.message);
      }
  }

  return (
    <div className="w-full flex flex-wrap gap-5 my-5 px-5">
      {errorgot ? (
        <p className="text-center text-sm text-red-600">{errorgot}</p>
      ) : (
        ""
      )}
      {loading ? (
        "Loading...."
      ) : null}
      
      {MyBlogs.map((blog) => (
        <BlogRead 
          key={blog._id}
          blog = {blog}
        />
      ))}

    </div>
  )
}

export default MyBlogs