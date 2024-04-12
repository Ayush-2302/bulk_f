import React, { createContext, useState } from "react";

const whatsBulkContext = createContext();
function Bulkcontext(props) {
  const host = "http://localhost:4040";
  const bulkinitial = [];
  const [bulks, setBulks] = useState(bulkinitial);

  const getBulk = async () => {
    const response = await fetch(`${host}/api/bulk/fetchbulk`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setBulks(json);
  };

  const addBulk = async ( message, contact, file) => {
    console.log("adding a bulk");

    const formData = new FormData();
    formData.append("message", message);
    formData.append("contact", contact);
    formData.append("file", file);

    try {
      const response = await fetch(`${host}/api/bulk/createbulk`, {
        method: "POST",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
        body: formData,
      });
      const bulk = await response.json();
      setBulks(bulks.concat(bulk));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteBulk = async (id) => {
    const response = await fetch(`${host}/api/bulk/detelebulk/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);

    const newBulk = bulks.filter((bulk) => {
      return bulk._id !== id;
    });
    setBulks(newBulk);
  };

  const editBulk = async (id,  message, contact, file) => {
    const response = await fetch(`${host}/api/bulk/updatebulk/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",

        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ message, contact, file }),
    });
    const json = await response.json();
    console.log(json);
    let newBulk = JSON.parse(JSON.stringify(bulks));

    for (let index = 0; index < newBulk.length; index++) {
      const element = newBulk[index];
      if (element._id === id) {
        newBulk[index].message = message;
        newBulk[index].contact = contact;
        newBulk[index].file = file;
        break;
      }
    }
    setBulks(newBulk);
  };

  return (
    <>
      <whatsBulkContext.Provider
        value={{ bulks, addBulk, editBulk, deleteBulk, getBulk }}
      >
        {props.children}
      </whatsBulkContext.Provider>
    </>
  );
}

export default Bulkcontext;
export { whatsBulkContext };
