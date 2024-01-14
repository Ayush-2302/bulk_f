import React, { useRef } from "react";
import { CSVReader } from "react-papaparse"
function Csvfile() {
  const buttonRef = useRef(null);
  const handleOnFileLoad = (data) => {
    console.log(data);
  };

  const onErrorHandler = (error, file, inputElem, rason) => {
    console.log(error);
  };
  const handleRemoveFile = () => {};

  return (
    <>
      <h1> preasenting the csv file in react</h1>
      <CSVReader
        ref={buttonRef}
        onFileload={handleOnFileLoad}
        onError={onErrorHandler}
        onClick
        noDrag
        onRemoveFile={handleRemoveFile}
      >
        button
      </CSVReader>
    </>
  );
}

export default Csvfile;
