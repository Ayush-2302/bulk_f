import React, { useContext } from "react";
import { whatsBulkContext } from "./Bulkcontext";
function Bulkitem(props) {
  const bulks = props.bulk;
  const context = useContext(whatsBulkContext);
  const { deleteBulk } = context;
  return (
    <>
      <div className="block rounded-lg lg:h-[40%] md:h-[40%] overflow-auto bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          WhatBulk
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Number:{bulks.number}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Message: {bulks.message}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Contact: {bulks.contact}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          File: {bulks.file}
        </p>
      <div className=" space-y-2 ">
        <button
          onClick={() => {
            props.updateBulk();
          }}
          type="button"
          className=" ml-2 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Edit
        </button>
        <button
          onClick={() => {
            props.showAlert("Sucessfullly deleted the Bulk", "success");
            deleteBulk(bulks._id);
          }}
          type="button"
          className="inline-block rounded ml-2 bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Delete
        </button>
        </div>
      </div>
    </>
  );
}

export default Bulkitem;
