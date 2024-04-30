import React, { useState, useRef, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import SignOut from "../components/SignOut";
import DeleteAccount from "../components/DeleteAccount";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";

const Profile = () => {
  const [formData, setformData] = useState({});
  const { authUser, setauthUser } = useAuthContext();
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [filePerc, setfilePerc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState("");
  const [loading, setloading] = useState(false);
  const [errorwhileupdating, seterrorwhileupdating] = useState(null);

  const handleInputChange = (e) => {
    setformData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
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
          setformData({ ...formData, profilePic: downloadURL });
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setloading(true);
      const res = await fetch(`/api/auth/update/${authUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterrorwhileupdating(data.message);
        return;
      }
      setloading(false);
      seterrorwhileupdating(null);
      localStorage.removeItem("chat-user");
      setauthUser(null);
      localStorage.setItem("chat-user", JSON.stringify(data));
      setauthUser(data);
    } catch (error) {
      seterrorwhileupdating(error.message);
      setloading(false);
    }
  };

  return (
    <div className="w-full min-h-screen ">
      <div className="w-[100%] md:w-[50%] py-8 mx-auto">
        <h1 className="uppercase font-extrabold text-2xl md:text-4xl text-center mb-4 ">
          PROFILE
        </h1>
        <form
          className="w-[100%] flex flex-col mx-auto gap-5 items-center px-4"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            ref={fileRef}
            onChange={(e) => setfile(e.target.files[0])}
            accept="image/*"
            hidden
            id="profilePic"
          />
          <img
            onClick={() => fileRef.current.click()}
            className="w-24 h-24 object-cover rounded-full hover:scale-110 hover:transition-all"
            src={formData.profilePic || authUser.profilePic}
            alt="profilePic"
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
            className="w-full md:w-[100%] rounded-lg border-2 border-slate-600 px-1 py-2 pointer-events-none"
            type="text"
            id="fullname"
            placeholder="FullName"
            value={authUser.fullname}
            readOnly
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-slate-600 px-1 py-2"
            type="text"
            id="username"
            placeholder={authUser.username}
            value={formData.username}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-slate-600 px-1 py-2"
            type="email"
            id="email"
            placeholder={authUser.email}
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            className="w-full md:w-[100%] rounded-lg border-2 border-slate-600 px-1 py-2"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            className="uppercase w-full md:w-[100%] bg-slate-400 font-semibold py-2 px-4 border-2 border-slate-600 text-white disabled:opacity-50 rounded-lg hover:opacity-70 cursor-pointer"
            disabled={loading}
          >
            {loading ? "Loading...." : "Update"}
          </button>

          {errorwhileupdating ? (
            <p className="text-red-700 text-center">{errorwhileupdating}</p>
          ) : (
            ""
          )}

          <div className="w-full flex justify-between ">
            <DeleteAccount />
            <SignOut />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
