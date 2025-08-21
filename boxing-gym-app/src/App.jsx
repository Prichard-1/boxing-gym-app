import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./SignUp";



function App() {
  return (
    <Router>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/" element={<Login/>}/>
          <Route path="/" element={<Hero />}/>
          <Route path="/" element={<SignUp/>}/>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
