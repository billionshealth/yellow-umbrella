import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./_app";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar2";
import Ancestry from "./pages/ancestry";
import TwentyThreeAndMe from "./pages/twentyThreeAndMe";
import MyHeritage from "./pages/myHeritage";
import NotFound from "./pages/notFound";

ReactDOM.render(
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
  </React.StrictMode>,
  document.getElementById("root")
);
