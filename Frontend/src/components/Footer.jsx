import React from "react";
import { Link } from "react-router-dom";

import { FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { useAuthContext } from "../context/AuthContext";

const Footer = () => {

  const {authUser} = useAuthContext()

  return (
    <div className="header  px-[4vw] pt-5 bg-slate-100 rounded-t-2xl border-t-2 border-slate-700 flex-col justify-between">
      <div className="nav flex gap-4 md:gap-20 justify-start md:flex-row">
        <div className="logo">
          <Link
            to={"/"}
            className="font-extrabold uppercase text-xl lg:text-2xl leading-tight hover:underline hover:text-purple-500 underline"
          >
            Tech blogs
          </Link>
        </div>
        <div className="menu flex-col">
          <h1 className="capitalize font-bold text-lg lg:text-xl mb-4">
            navigation links
          </h1>
          <ul className="flex gap-2 text-xl items-start md:items-center cursor-pointer flex-col">
            <Link to={"/"}>
              <li className="hover:text-purple-500 hover:underline text-sm md:text-base">
                Home
              </li>
            </Link>
            <Link to={"/about"}>
              <li className="hover:text-purple-500 hover:underline text-sm md:text-base">
                About
              </li>
            </Link>
            <Link to={"/create"}>
              <li className="hover:text-purple-500 hover:underline text-sm md:text-base">
                CreateBlog
              </li>
            </Link>
            {authUser ? (
                <Link to={`/myblogs/${authUser._id}`}>
                  <li className="hover:text-purple-500 hover:underline text-sm md:text-base">MyBlogs</li>
                </Link>
              ) : ""}
          </ul>
        </div>

        <div className="menu flex-col">
          <h1 className="capitalize font-bold text-lg lg:text-xl mb-4">
            Social Media Links
          </h1>
          <ul className="flex gap-2 text-xl items-start md:items-center  cursor-pointer flex-col">
            <Link
              to={
                "https://www.linkedin.com/in/arjun-nagar-8b748b276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              }
            >
              <li className="hover:text-purple-500 hover:underline">
                <FaLinkedin className="text-blue-500 text-3xl hover:text-blue-800" />
              </li>
            </Link>
            <Link to={"/"}>
              <li className="hover:text-purple-500 hover:underline">
                <FaInstagramSquare className="text-red-500 text-3xl hover:text-red-800" />
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="text-sm font-semibold text-center mb-0 mt-10">
        Copyright <span className="font-extrabold">©</span> 2024 TECH BLOGS. All
        Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
