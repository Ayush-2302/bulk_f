import React, { useContext } from "react";
import { whatsBulkContext } from "./Bulkcontext";

function Bulkitem(props) {
  const bulks = props.bulk;
  const context = useContext(whatsBulkContext);
  const { deleteBulk } = context;

  return (
    <div className="bg-white rounded-lg h-96 overflow-auto scroll_new shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex flex-col items-center">
        <img
          className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 hover:scale-110"
          src={bulks.file}
          alt="Bulk item"
        />
        <h5 className="text-xl font-semibold text-gray-800 capitalize mb-2 text-center">
          {bulks.message}
        </h5>
        <p className="text-base text-gray-600 mb-4 text-center">
          {bulks.contact}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        {/* Edit Button */}
        <button
          onClick={() => props.updateBulk(bulks)}
          type="button"
          className="bg-blue-500 hover:bg-blue-500 text-white text-xs font-medium uppercase rounded-md px-6 py-2 shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => {
            props.showAlert("Successfully deleted the Bulk", "success");
            deleteBulk(bulks._id);
          }}
          type="button"
          className="bg-red-600 hover:bg-red-500 text-white text-xs font-medium uppercase rounded-md px-6 py-2 shadow-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Bulkitem;
