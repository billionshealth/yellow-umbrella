import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Ancestry from "./pages/ancestry";
import TwentyThreeAndMe from "./pages/23andme";
import MyHeritage from "./pages/myheritage";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Ancestry />} />
          <Route path="/23andme" element={<TwentyThreeAndMe />} />
          <Route path="/myheritage" element={<MyHeritage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
