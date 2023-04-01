import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CreateForm from "./CreateForm";
import FindForm from "./FindForm";
import DogProfile from "./DogProfile";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ textAlign: "center" }}>
        <h1>Doggy Macros</h1>
        <h4>
          The only site you'll need to ensure your dog eats healthier than
          you do!
        </h4>
      </div>

      <div style={{ textAlign: "center" }}>
        <Link to="/dog/add">Add a Dog</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/dog/find">Find a Dog</Link><br></br><br></br><br></br>
      </div>
      <Routes>
        <Route path="/dog/add" element={<CreateForm />} />
        <Route path="/dog/find" element={<FindForm />} />
        <Route path="/dog/:name" element={<DogProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
