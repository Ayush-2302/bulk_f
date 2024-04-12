import { useState } from "react";
import "./App.css";
import Home from "./component/Home";
import Login from "./component/Login";
import Nave from "./component/Nave";
import Signup from "./component/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Alert from "./component/Alert";
import Bulk from "./component/Bulk";
import Bulkcontext from "./component/Bulkcontext";
import About from "./component/About";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <Bulkcontext>
      
      <Router>
        <Nave showAlert={showAlert} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert} />} />
          <Route exact path="/about" element={<About showAlert={showAlert} />} />
          <Route exact path="/bulk" element={<Bulk showAlert={showAlert} />} />
          <Route
            exact
            path="/login"
            element={<Login showAlert={showAlert} />}
          />
          <Route
            exact
            path="/signup"
            element={<Signup showAlert={showAlert} />}
          />
        </Routes>
      </Router>
    </Bulkcontext>
  );
}
export default App;
