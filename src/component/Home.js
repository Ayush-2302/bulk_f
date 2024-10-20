import React from "react";
import BlogUi from "./BlogUi";

function Home(props) {
  return (
    <>
      <BlogUi showAlert={props.showAlert} />
    </>
  );
}

export default Home;
