import React, { useContext, useEffect, useState } from "react";
import { whatsBulkContext } from "./Bulkcontext";
import Bulkitem from "./Bulkitem";
import { AiOutlinePauseCircle, AiOutlinePlaySquare } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
import {
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import { useNavigate } from "react-router-dom";

export default function Bulk(props) {
  const navigate = useNavigate();
  const context = useContext(whatsBulkContext);
  const { bulks, getBulk, editBulk } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getBulk();
    } else {
      navigate("/login");
    }
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [bulk, setBulk] = useState({
    id: "",
    emessage: "",
    econtact: "",
    efile: "",
  });
  const [emojiVisible, setEmojiVisible] = useState(false);

  const updateBulk = (currentBulk) => {
    setShowModal(true);
    setBulk({
      id: currentBulk._id,
      emessage: currentBulk.message,
      econtact: currentBulk.contact,
      efile: currentBulk.file,
    });
  };

  const handleClick = () => {
    editBulk(bulk.id, bulk.emessage, bulk.econtact, bulk.efile);
    setShowModal(false);
    props.showAlert("Successfully Edited your Bulk", "success");
  };

  const onChange = (e) => {
    setBulk({ ...bulk, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TEModal show={showModal} className="w-96" setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              <h5 className="text-2xl text-blue-600 font-semibold">
                Update Bulk
              </h5>
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </TEModalHeader>
            <TEModalBody>
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <p className="text-3xl text-center text-blue-600 font-semibold mb-4">
                  WhatBulk
                </p>
                <div className="mb-6">
                  <h2 className="text-xl text-blue-600 font-semibold">Title</h2>
                  <div className="flex items-center space-x-2 mb-2">
                    <textarea
                      name="emessage"
                      onChange={onChange}
                      value={bulk.emessage}
                      minLength={5}
                      required
                      className="flex-1 border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    />
                    <button
                      onClick={() => setEmojiVisible(!emojiVisible)}
                      className="text-2xl text-gray-700 hover:text-blue-500 transition-colors duration-200"
                    >
                      😀
                    </button>
                    {emojiVisible && (
                      <div className="absolute -translate-x-10 z-50">
                        <EmojiPicker
                          onEmojiClick={(emoji) =>
                            setBulk({
                              ...bulk,
                              emessage: bulk.emessage + emoji.emoji,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <h2 className="text-xl text-blue-600 font-semibold">
                    Content
                  </h2>
                  <textarea
                    name="econtact"
                    onChange={onChange}
                    rows={5}
                    value={bulk.econtact}
                    className="flex-1 border-2 w-11/12 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 transition-all duration-200"
                    minLength={5}
                    required
                  />
                </div>
              </div>
            </TEModalBody>
            <TEModalFooter>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Close
              </button>
              <button
                onClick={handleClick}
                disabled={bulk.emessage.length < 5 || bulk.econtact.length < 5}
                className={`ml-2 px-4 py-2 rounded-md text-white ${
                  bulk.emessage.length < 5 || bulk.econtact.length < 5
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-all duration-200`}
              >
                Save changes
              </button>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

      <div className="text-2xl ml-20 mb-4">
        <p className="text-4xl pb-4 font-semibold">Your Blogs</p>
        {bulks.length === 0 && (
          <p className="text-gray-500">Nothing to display, please add a bulk</p>
        )}
      </div>
      <div className="w-11/12 mx-auto">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 mx-4">
          {bulks.map((bulk, index) => (
            <Bulkitem
              key={index}
              bulk={bulk}
              updateBulk={updateBulk}
              showAlert={props.showAlert}
            />
          ))}
        </div>
      </div>
    </>
  );
}
