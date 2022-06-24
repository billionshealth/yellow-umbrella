import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import App from "./_app";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ancestry from "./pages/ancestry";
import TwentyThreeAndMe from "./pages/twentyThreeAndMe";
import MyHeritage from "./pages/myHeritage";
import NotFound from "./pages/notFound";

ReactDOM.render(
  <React.StrictMode>
    <Router>
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
