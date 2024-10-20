import React, { useContext } from "react";
import { whatsBulkContext } from "./Bulkcontext";

function Bulkitem(props) {
  const bulks = props.bulk;
  const context = useContext(whatsBulkContext);
  const { deleteBulk } = context;

  return (
    <div className="block scroll_new rounded-lg lg:h-[310px] md:h-[310%] overflow-auto bg-[#2f2f2f] p-6 shadow-lg transition-transform duration-200 ease-in-out hover:shadow-lg">
      <div className="flex flex-col items-center">
        <img
          className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-105"
          src={bulks.file}
          alt="Bulk item"
        />
        <h5 className="mb-2 text-xl font-semibold capitalize leading-tight text-center">
          {bulks.message}
        </h5>
        <p className="mb-4 text-base  text-center">{bulks.contact}</p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => props.updateBulk(bulks)}
          type="button"
          className="inline-block rounded bg-primary px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none"
        >
          Edit
        </button>
        <button
          onClick={() => {
            props.showAlert("Successfully deleted the Bulk", "success");
            deleteBulk(bulks._id);
          }}
          type="button"
          className="inline-block rounded bg-red-600 px-6 py-2 text-xs font-medium uppercase leading-normal text-white shadow transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Bulkitem;
