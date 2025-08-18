import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
	      <Route path="/" element={<Navbar/>}/>

      </Routes>
    </Router>
  );
}

export default App;

