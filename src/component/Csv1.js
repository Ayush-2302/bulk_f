import { createContext, useState } from "react";
import * as XLSX from "xlsx";
import Whatsbulkui from "./Whatsbulkui";
const csv = createContext;

function Csv1() {
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

  return (
    <csv.Provider value={{data, handleFileUpload}}>
      <Whatsbulkui />
    </csv.Provider>

    // <div className="App">
    //   {data.length > 0 && (
    //     <table className="table">
    //       <thead>
    //         <tr>
    //           {Object.keys(data[0]).map((key) => (
    //             <th key={key}>{key}</th>
    //           ))}
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((row, index) => (
    //           <tr key={index}>
    //             {Object.values(row).map((value, index) => (
    //               <td key={index}>{value}</td>
    //             ))}
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   )}

    //   <input type="file" name="csv"  onChange={handleFileUpload}/>
    //   <br />
    //   <br />
    // </div>
  );
}

export default Csv1;
export { csv };
