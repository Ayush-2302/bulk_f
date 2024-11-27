import React, { useContext, useEffect, useState } from "react";
import { AiOutlinePauseCircle, AiOutlinePlaySquare } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { whatsBulkContext } from "./Bulkcontext";
import Emoji from "./Emoji";

function BlogUi(props) {
  const [data, setData] = useState([]);
  const [bulk, setBulk] = useState({ message: "", contact: "", file: "" });
  const [file, setFile] = useState("");
  const [emoji, setEmoji] = useState(false);
  const context = useContext(whatsBulkContext);
  const { addBulk, getBulk } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBulk();
    } else {
      navigate("/login");
    }
  }, [getBulk, navigate]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (bulk.message.length < 5 || bulk.contact.length < 5 || !file) {
      props.showAlert("Please fill all fields correctly.", "danger");
      return;
    }

    try {
      addBulk(bulk.message, bulk.contact, file);
      setBulk({ message: "", contact: "", file: "" });
      setFile("");
      props.showAlert("Successfully added a new Bulk", "success");
    } catch (error) {
      props.showAlert("Not able to add a Bulk", "danger");
      console.error(error.message);
    }
  };

  const onChange = (e) => {
    setBulk({ ...bulk, [e.target.name]: e.target.value });
  };

  const handleEmojiToggle = () => {
    setEmoji(!emoji);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 lg:w-3/4 mx-auto mb-20">
      <h1 className="text-4xl text-center p-3 font-semibold text-gray-800">Create New Blog</h1>

      {/* Title Section */}
      <div className="msg pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-700">Title</h2>
          <div className="ico flex space-x-3 text-2xl text-gray-600">
            <AiOutlinePlaySquare />
            <AiOutlinePauseCircle />
          </div>
        </div>
        <textarea
          name="message"
          onChange={onChange}
          value={bulk.message}
          minLength={5}
          required
          className="border-2  text-gray-800 p-4 rounded-md w-full min-h-[100px] resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter your blog title..."
        />
        <div className="emoji float-right mt-2">
          <div
            onClick={handleEmojiToggle}
            className="hover:cursor-pointer text-2xl text-gray-600"
          >
            😀
          </div>
          {emoji && <div className="absolute -translate-x-80 mt-2"><Emoji /></div>}
        </div>
      </div>

      {/* Content Section */}
      <div className="contact pt-8">
        <h2 className="text-2xl font-semibold text-gray-700">Content</h2>
        <textarea
          name="contact"
          onChange={onChange}
          value={bulk.contact}
          minLength={5}
          required
          className="border-2  text-gray-800 p-4 rounded-md w-full min-h-[150px] resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          placeholder="Enter your blog content..."
        />
      </div>

      {/* File Upload Section */}
      <div className="file pt-6">
        <h2 className="text-2xl font-semibold text-gray-700">Image</h2>
        <input
          name="file"
          type="file"
          onChange={onInputChange}
          required
          className="border-2  text-gray-800 p-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-8 justify-center">
        <button
          type="button"
          onClick={() => setBulk({ message: "", contact: "" })}
          className="bg-blue-500 text-white py-2 px-6 rounded-md transition duration-200 hover:bg-blue-400 focus:ring-2 focus:ring-blue-300"
        >
          Prepare
        </button>
        <button
          disabled={bulk.message.length < 5 || bulk.contact.length < 5 || !file}
          type="button"
          onClick={handleClick}
          className={`py-2 px-6 rounded-md transition duration-200 ${
            bulk.message.length >= 5 && bulk.contact.length >= 5 && file
              ? "bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default BlogUi;
