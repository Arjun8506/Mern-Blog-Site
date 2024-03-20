import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { useNavigate } from "react-router-dom";

const PageOfEditBlog = () => {
  const { authUser } = useAuthContext();
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [formData, setformData] = useState({});
  const [filePerc, setfilePerc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState("");
  const [errorgot, seterrorgot] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const [prevBlogData, setprevBlogData] = useState({})
  
  const [blogId, setBlogId] = useState("");

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.href;
    // Split the URL by '/'
    const parts = currentUrl.split("/");
    // Get the last part which should be the blog ID
    const id = parts[parts.length - 1];
    // Update state with the blog ID
    setBlogId(id);
  }, []);

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleUploadCoverImage(file);
    }
  }, [file]);

  const handleUploadCoverImage = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setfilePerc(Math.round(progress));
      },
      (error) => {
        setfileUploadError(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setformData({ ...formData, coverImage: downloadURL });
        });
      }
    );
  };

  useEffect(() => {
    editBlog()
  }, [blogId])
  

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
      setprevBlogData(data.blogToUpdate)
    } catch (error) {
      seterrorgot(error.message);
      setloading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch(`/api/blog/update/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        seterrorgot(data.message);
        return;
      }
      setloading(false);
      seterrorgot(null);
      alert(data.message)
      navigate("/")
    } catch (error) {
      seterrorgot(error.message);
      setloading(false);
    }
  };
  return (
    <div>
      <div className="w-full min-h-[80vh]  py-8 md:py-14 px-8 md:px-20">
        <div className="w-full min-h-[80vh] flex flex-col items-center">
          <h1 className="text-1xl mb-4 capitalize font-semibold text-zinc-800">
            <span className="uppercase mx-2 text-purple-950 font-extrabold text-2xl">
              edit
            </span>
            your blog here
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-[100%] lg:w-[80%] flex flex-col mx-auto gap-4 items-center"
          >
            <img
              className="w-[100%] lg:w-[80%] h-[80vh]  border-4 border-purple-900 object-cover rounded-lg mb-4"
              src={prevBlogData.coverImage || formData.coverImage}
              alt="blogCoverImage"
              onClick={() => fileRef.current.click()}
            />

            {filePerc ? (
              <p className="text-center text-sm text-green-400">
                Image Uploaded {filePerc}%
              </p>
            ) : (
              ""
            )}

            {fileUploadError ? (
              <p className="text-center text-sm text-red-400">
                {fileUploadError}
              </p>
            ) : (
              ""
            )}

            <input
              className=""
              type="file"
              accept="image/*"
              ref={fileRef}
              hidden
              onChange={(e) => setfile(e.target.files[0])}
            />

            <input
              className="w-[100%] lg:w-[80%] rounded-lg border-2 border-purple-600 py-1 px-2"
              type="text"
              name="title"
              id="title"
              placeholder={prevBlogData.title}
              value={formData.title}
              onChange={handleInputChange}
            />

            <textarea
              rows={10}
              className="w-[100%] lg:w-[80%] rounded-lg border-2 border-purple-600 py-1 px-2"
              type=""
              name="content"
              id="content"
              placeholder={prevBlogData.content}
              value={formData.content}
              onChange={handleInputChange}
            />

            <button
              className="w-[100%] lg:w-[80%] bg-green-800 font-semibold py-2 px-4 border-2 border-green-400 rounded-lg  cursor-pointer hover:opacity-90 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Loading...." : "Update Blog"}
            </button>
          </form>

          {errorgot ? (
            <p className="text-center text-sm text-red-700">
              {errorgot.message}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default PageOfEditBlog;
