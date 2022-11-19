import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Repo from "./Repo";
import "./app.css"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:user" element={<Repo />} />
      </Routes>
    </>
  );
};

export default App;
