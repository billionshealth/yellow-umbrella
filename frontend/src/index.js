import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar2";
import Ancestry from "./pages/ancestry";
import TwentyThreeAndMe from "./pages/twentyThreeAndMe";
import MyHeritage from "./pages/myheritage";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ancestry" element={<Ancestry />} />
        <Route path="/23andme" element={<TwentyThreeAndMe />} />
        <Route path="/myheritage" element={<MyHeritage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
