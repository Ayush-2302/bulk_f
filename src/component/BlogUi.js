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
    <div className="bg-[#2f2f2f] text-white p-5 rounded-md w-11/12 m-auto mb-20">
      <h1 className="text-4xl text-center p-3  font-semibold">Create New Blog</h1>

      <div className="msg pl-10 w-11/12 pt-3">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl  font-semibold">Title</h2>
          <div className="ico flex pr-5 space-x-3 text-2xl ">
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
          className="border-2 border-blue-500 inputColor text-white p-2 rounded-md w-full min-h-[100px] resize-none"
          placeholder="Enter your blog title..."
        />
        <div className="emoji float-right">
          <div onClick={handleEmojiToggle} className="hover:cursor-pointer text-2xl">😀</div>
          {emoji && <div className="absolute -translate-x-80"><Emoji /></div>}
        </div>
      </div>

      <div className="contact pl-10 w-11/12 pt-8">
        <h2 className="text-2xl  font-semibold">Content</h2>
        <textarea
          name="contact"
          onChange={onChange}
          value={bulk.contact}
          minLength={5}
          required
          className="border-2 border-blue-500 inputColor text-white p-2 rounded-md w-full min-h-[100px] resize-none"
          placeholder="Enter your blog content..."
        />
      </div>

      <div className="file pl-10 w-11/12 pt-3">
        <h2 className="text-2xl  font-semibold">Image</h2>
        <input
          name="file"
          type="file"
          onChange={onInputChange}
          required
          className="border-2 border-blue-500 inputColor text-white p-2 rounded-md w-full"
        />
      </div>

      <div className="flex space-x-2 p-8">
        <button
          type="button"
          onClick={() => setBulk({ message: "", contact: "" })}
          className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-200 hover:bg-blue-400"
        >
          Prepare
        </button>
        <button
          disabled={bulk.message.length < 5 || bulk.contact.length < 5 || !file}
          type="button"
          onClick={handleClick}
          className={`py-2 px-4 rounded-md transition duration-200 ${bulk.message.length >= 5 && bulk.contact.length >= 5 && file ? "bg-blue-600 hover:bg-blue-500" : "bg-gray-600 cursor-not-allowed"}`}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default BlogUi;
