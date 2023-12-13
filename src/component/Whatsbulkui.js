import React, { useContext, useEffect, useState } from "react";
// import EmojiPicker from "emzoji-picker-react";
import { AiOutlinePauseCircle, AiOutlinePlaySquare } from "react-icons/ai";
import { whatsBulkContext } from "./Bulkcontext";
import { useNavigate } from "react-router-dom";
import Emoji from "./Emoji";
import * as XLSX from "xlsx";

function Whatsbulkui(props) {
  // const context1 = useContext(csv);
  // const { data, handleFileUpload } = context1;

  const [data, setData] = useState([]);

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

  const context = useContext(whatsBulkContext);
  const { addBulk, getBulk } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBulk();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [emoji, setEmoji] = useState(false);
  const handleEmoji = () => {
    setEmoji(!emoji);
  };

  const [bulk, setBulk] = useState({
    number: "",
    message: "",
    contact: "",
    file: "",
    data: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addBulk(bulk.number, bulk.message, bulk.contact, bulk.file);
    setBulk({ number: "", message: "", contact: "", file: "" });
    props.showAlert("Sucessfullly added a new Bulk", "success");
    console.log(bulk);
  };
  const onChange = (e) => {
    setBulk({ ...bulk, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="bulk m-auto  p-5 mb-20 rounded-md w-11/12 bg-white">
        <p className=" text-4xl  text-center p-3 text-info rounded-md font-semibold ">
          WhatBulk
        </p>
        <div className="txt pl-10  w-11/12  pt-4 ">
          <div className="flex justify-between items-center">
            <h2 className=" text-2xl text-info font-semibold">Number</h2>
            <div className="ico flex pr-5 space-x-3 text-2xl text-info">
              <AiOutlinePlaySquare />
              <AiOutlinePauseCircle />
            </div>
          </div>

          <textarea
            name="number"
            id="number"
            value={bulk.number}
            minLength={5}
            required
            onChange={onChange}
            className=" flex border-2 pl-2 rounded-md w-full"
          ></textarea>
          {/* <Csv1 /> */}

          <h2 className=" text-2xl mt-2 mb-2 text-info font-semibold">Csv File</h2>

          <div
            className="App  border-gray-200 h-20 overflow-auto w-full  rounded-md border-2"
            value={bulk.data}
            name="data"
            id="daat"
            onChange={onChange}
          >
            {data.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    {Object.keys(data[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index}>
                      {Object.values(row).map((value, index) => (
                        <td className=" px-10" key={index}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>

          <input
            type="file"
            onChange={handleFileUpload}
            className="inline-block rounded bg-info mt-1 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-info-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-info-400 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          />
        </div>
        <div className="msg pl-10 w-11/12   pt-3">
          <h2 className=" text-2xl text-info font-semibold">Message</h2>
          <textarea
            name="message"
            id="message"
            onChange={onChange}
            value={bulk.message}
            minLength={5}
            required
            className=" flex border-2 pl-2 rounded-md w-full"
          ></textarea>
          <div className="emoji float-right">
            <div
              onClick={handleEmoji}
              className=" hover:cursor-pointer  text-2xl"
            >
              😀
            </div>
            <div
              className={`${emoji ? "" : "hidden"} absolute -translate-x-80`}
            >
              <Emoji />
            </div>
          </div>
        </div>
        <div className="contact pl-10 w-11/12   pt-8">
          <h2 className=" text-2xl text-info font-semibold">Contact</h2>
          <textarea
            name="contact"
            id="contact"
            onChange={onChange}
            value={bulk.contact}
            minLength={5}
            required
            className=" flex border-2 pl-2 rounded-md w-full"
          ></textarea>
        </div>

        <div className="file pl-10 w-11/12  pt-3  ">
          <h2 className=" text-2xl text-info font-semibold">file</h2>
          <input
            name="file"
            id="file"
            type="file"
            onChange={onChange}
            value={bulk.file}
            minLength={5}
            required
            className=" flex border-2 pl-2 p-3 rounded-md w-full"
          ></input>
        </div>

        <div className="flex  space-x-2 p-8 ">
          <button
            onClick={() => {
              setBulk({ number: "", message: "", contact: "", file: "" });
            }}
            type="button"
            className="inline-block rounded bg-info mt-1 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-info-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-info-400 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Prepare
          </button>
          <button
            disabled={
              bulk.number.length < 5 ||
              bulk.message.length < 5 ||
              bulk.contact.length < 5 ||
              bulk.file.length < 5
            }
            type="button"
            onClick={handleClick}
            className="inline-block rounded bg-info mt-1 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-info-400 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-info-400 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default Whatsbulkui;
