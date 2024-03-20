import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const EditBlog = ({blogId}) => {

  const [errorgot, seterrorgot] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate()

  const editBlog = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/blog/edit/${blogId}`, {
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
      navigate(`/edit/${blogId}`)
    } catch (error) {
      seterrorgot(error.message);
      setloading(false);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
    <button onClick={() => editBlog()} type='button' className='bg-green-600 py-2 px-2 rounded-lg font-bold uppercase hover:opacity-75' >
        Edit Blog
    </button>
    {errorgot ? (
        <p className="text-[1.8vw] text-red-700 text-center">{errorgot}</p>
      ) : (
        ""
      )}
    </div>
  )
}

export default EditBlog