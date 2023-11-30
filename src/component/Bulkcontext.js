import React, { createContext, useState } from "react";

const whatsBulkContext = createContext();
function Bulkcontext(props) {
  const host = "https://bulk-backend.onrender.com";
  const bulkinitial = [];
  const [bulks, setBulks] = useState(bulkinitial);

  const getBulk = async () => {
    const response = await fetch(`${host}/api/bulk/fetchbulk`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setBulks(json);
  };

  const addBulk = async (number, message, contact, file) => {
    console.log("addding a bulk");

    const response = await fetch(`${host}/api/bulk/createbulk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },
      body: JSON.stringify({ number, message, contact, file }),
    });
    const bulk = await response.json();
    setBulks(bulks.concat(bulk));
  };

  const deleteBulk = async (id) => {
    const response = await fetch(`${host}/api/bulk/detelebulk/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      },
    });
    const json =await response.json();
    console.log(json);

    const newBulk = bulks.filter((bulk) => {
      return bulk._id !== id;
    });
    setBulks(newBulk);
  };

  const editBulk = async (id, number, message, contact, file) => {
    const response = await fetch(
      `${host}/api/bulk/updatebulk/${id}`,
      {      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
        localStorage.getItem('token')
      },
      body: JSON.stringify({ number, message, contact, file }),
    });
    const json = await response.json();
    console.log(json);
    let newBulk = JSON.parse(JSON.stringify(bulks));

    for (let index = 0; index < newBulk.length; index++) {
      const element = newBulk[index];
      if (element._id === id) {
        newBulk[index].number = number;
        newBulk[index].message = message;
        newBulk[index].contact = contact; 
        newBulk[index].file = file; 
        break; 
      }
    }  
    setBulks(newBulk);
  }

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
