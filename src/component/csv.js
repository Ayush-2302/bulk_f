import { useState, useEffect } from 'react';
import Data from './data.csv';
import Papa from 'papaparse';
import * as XLSX from "xlsx";

function CsvFileUpload() {

  const [data, setData] = useState([]);

  // parse CSV data & store it in the component state

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    });
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const parsedData = Papa.parse(reader.result);
      setData(parsedData.data);
    };
    reader.readAsText(file);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch(Data);
  //     const reader = response.body.getReader();
  //     const result = await reader.read();
  //     const decoder = new TextDecoder("utf-8");
  //     const csvData = decoder.decode(result.value);
  //     const parsedData = Papa.parse(csvData, { 
  //       header: true, 
  //       skipEmptyLines: true 
  //     }).data;
  //     setData(parsedData);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="App">

      <input type="file" accept=".csv" onChange={handleFileUpload} />

      {data.length ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Age</th>
              <th>Occupation</th> */}
              {/* <th>Date</th>
              <th>Mobile</th>
              <th>Prize</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className=' pl-10'>{row.Name}</td>
                {/* <td>{row.Age}</td>
                <td>{row.Occupation}</td> */}
                {/* <td className=' pl-20'>{row.Data}</td>
                <td className=' pl-20'>{row.Mobile}</td>
                <td className=' pl-20'>{row.Prize}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <br /><br />
    

    </div>
  );
}

export default CsvFileUpload;
