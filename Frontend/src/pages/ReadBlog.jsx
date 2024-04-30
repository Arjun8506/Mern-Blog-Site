import React, { useEffect, useRef, useState } from "react";
import EditBlog from "../components/EditBlog";
import DeleteBlog from "../components/DeleteBlog";
import { useAuthContext } from "../context/AuthContext";
import { FiSend } from "react-icons/fi";
import { RiLoader2Fill } from "react-icons/ri";
import Comment from "../components/Comment";

const ReadBlog = () => {
  const { authUser } = useAuthContext();

  const [blogId, setBlogId] = useState("");
  const [loading, setloading] = useState(false);
  const [errorgot, seterrorgot] = useState(null);
  const [blogToRead, setblogToRead] = useState({});
  const [blogAuthor, setblogAuthor] = useState({});
  const [allComments, setallComments] = useState([]);

  console.log(allComments);

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

  useEffect(() => {
    getBlogWantToRead();
  }, [blogId]);

  const getBlogWantToRead = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/blog/read/${blogId}`);
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterrorgot(data.message);
        return;
      }
      setloading(false);
      seterrorgot(null);
      setblogToRead(data.ReadBlog);
      setblogAuthor(data.ReadBlog.author);
    } catch (error) {
      setloading(false);
      seterrorgot(error.message);
    }
  };

  const formattedDate = new Date(blogToRead.createdAt).toLocaleString("en-IN", {
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const getAllComments = async () => {
    try {
      setloading(true);
      const res = await fetch(`/api/comment/allcomments/${blogId}`);
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        seterrorgot(data.message);
        return;
      }
      setloading(false);
      seterrorgot(null);
      setallComments(data.AllComments);
    } catch (error) {
      setloading(false);
      seterrorgot(error.message);
    }
  };

  const [commentData, setcommentData] = useState({
    comment: "",
  });
  const [commenterror, setcommenterror] = useState(null);
  const [successMessage, setsuccessMessage] = useState(null);

  const handleSendCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentData.comment === "") {
      return setcommenterror("Write Comment First");
    }
    try {
      setloading(true);
      const res = await fetch(`/api/comment/create/${blogId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });
      const data = await res.json();
      if (data.success === false) {
        setloading(false);
        setcommenterror(data.message);
        return;
      }
      setloading(false);
      setcommenterror(null);
      setsuccessMessage(data.message);
    } catch (error) {
      console.error("Error:", error.message);
      setcommenterror(error.message);
      setloading(false);
    }
  };

  const fetchCommentsFlag = useRef(false);

  useEffect(() => {
    if (fetchCommentsFlag.current) {
      getAllComments();
      fetchCommentsFlag.current = false;
    }
  }, [blogId, commentData]);

  useEffect(() => {
    fetchCommentsFlag.current = true;
  }, [commentData]);

  return (
    <div className="w-full mx-auto lg:w-[70%] min-h-screen p-4">
      <div className="w-full h-[60vh] lg:h-[60vh] border-4 rounded-lg overflow-hidden border-purple-500">
        <img
          className="w-full h-full object-cover"
          src={blogToRead.coverImage}
          alt="coverImage"
        />
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold">{formattedDate}</p>
          <div className="flex items-center gap-2">
            Created By
            <img
              className="w-8 h-8 object-cover rounded-full"
              src={blogAuthor.profilePic}
              alt=""
            />
            <span className=" text-sm capitalize font-semibold">
              {blogAuthor.fullname}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {authUser ? (
          <div className="flex justify-between items-center">
            <EditBlog blogId={blogId} />
            <DeleteBlog blogId={blogId} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="w-[90%] lg:w-full  my-5">
        <div className="mb-5">
          <div className="text-lg text-center font-bold uppercase">{blogToRead.title}</div>
        </div>
        <div>
          <div className="text-sm md:text-lg">
            <p className="text-sm">{blogToRead.content}</p>
          </div>
        </div>
      </div>

      {authUser ? (
        <div className="w-[90%] mx-auto my-4 rounded-lg shadow-md shadow-slate-900  lg:w-[60%] h-fit bg-slate-100 p-5">
          <h1 className="text-sm capitalize font-semibold">Comment :</h1>
          <form
            className="w-full flex gap-2"
            onSubmit={handleSendCommentSubmit}
          >
            <input
              type="text"
              id="comment"
              className="w-[90%] mx-auto bg-transparent focus:outline-none border-b-2"
              value={commentData.comment}
              onChange={(e) =>
                setcommentData({ ...commentData, comment: e.target.value })
              }
            />
            <button
              disabled={loading}
              id="fetchCommentsAgain"
              className="border-2 p-2 rounded-lg bg-green-500 disabled:opacity-50 hover:opacity-90 border-green-400 text-white"
            >
              {loading ? <RiLoader2Fill className="rotate-180" /> : <FiSend />}
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
      {successMessage ? (
        <p className="text-[1.8vw] text-center text-green-500">
          {successMessage}
        </p>
      ) : (
        ""
      )}

      {commenterror ? (
        <p className="text-red-700 text-[1.8vw] text-center">{commenterror}</p>
      ) : (
        ""
      )}

      <div className=" rounded-lg">
        {allComments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default ReadBlog;
