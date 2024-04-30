import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const { authUser } = useAuthContext();
  const [showMenu, setshowMenu] = useState(false);

  const toggleMenu = () => {
    setshowMenu(!showMenu);
  };

  return (
    <div className=" header  px-[4vw] py-5 bg-slate-100 rounded-b-2xl border-b-2 border-slate-700">
      <div className="nav flex justify-between">
        <div className="flex items-center justify-center mr-5  lg:hidden">
        <button className="text-black text-2xl border-none" onClick={toggleMenu}>
          <GiHamburgerMenu />
        </button>
        </div>

        {showMenu ? (
          <div className="absolute w-[100%] py-5 bg-slate-900/80 z-10 top-24 left-0 rounded-lg">
            <ul className="text-white flex flex-col  gap-5 text-xl items-center cursor-pointer">
            <Link to={"/"}>
              <li className="hover:text-purple-500 hover:underline border-b-2">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:text-purple-500 hover:underline  border-b-2">
                About
              </li>
            </Link>
            <Link to={"/create"}>
              <li className="hover:text-purple-500 hover:underline  border-b-2">
                CreateBlog
              </li>
            </Link>

            {authUser ? (
              <Link to={`/myblogs/${authUser._id}`}>
                <li className="hover:text-purple-500 hover:underline  border-b-2">
                  MyBlogs
                </li>
              </Link>
            ) : (
              ""
            )}
            </ul>
          </div>
        ) : ""}

        <div className="logo flex items-center">
          <Link
            to={"/"}
            className="font-extrabold uppercase text-lg lg:text-3xl leading-tight hover:underline hover:text-purple-500"
          >
            Tech blogs
          </Link>
        </div>
        <div className="menu flex">
          <ul className="flex gap-5 text-base items-center cursor-pointer">
            <Link to={"/"}>
              <li className="hover:text-purple-500 hover:underline hidden lg:inline">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:text-purple-500 hover:underline hidden lg:inline">
                About
              </li>
            </Link>
            <Link to={"/create"}>
              <li className="hover:text-purple-500 hover:underline hidden lg:inline">
                CreateBlog
              </li>
            </Link>

            {authUser ? (
              <Link to={`/myblogs/${authUser._id}`}>
                <li className="hover:text-purple-500 hover:underline hidden lg:inline">
                  MyBlogs
                </li>
              </Link>
            ) : (
              ""
            )}

            {authUser ? (
              <Link to={"/profile"}>
                <img
                  className="w-52 sm:w-14 h-14 object-cover hover:scale-105 hover:transition-all rounded-full "
                  src={authUser.profilePic}
                  alt="profileImage"
                />
              </Link>
            ) : (
              <Link to={"login"}>
                <li className="ml-14 hover:text-purple-500 hover:underline">
                  Login
                </li>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
