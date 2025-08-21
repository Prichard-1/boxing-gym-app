import { useState } from "react";
import {useNavigate, Link} from "react-router-dom";

function Login(){
    const [email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const navigate=useNavigate();

    const handleLogin=(e) => {
        e.preventDefault();
        

        //storage user
        const storeUser = JSON.parse(localStorage.getItem("user"));
        if (storeUser && storedUser.email === email && storedUser.password === password){
            alert("Login successful");
            navigate("/dashboard");
        } else{
            alert("invalid credentials");
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-x1 round-2x1 p-8 w-full max-w-md">
        <h2 className="text-2x1 font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input  
              type="email"
              value="{email}"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-1g px-3 py-2 focus:ring-2-blue-500 outline-none"
              required
              />
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-1g fornt-semibold hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
            Don't have an account?{""}
            <Link to="/SignUp" className="text-blue-600 hover:underline">
            Register here
            </Link>
        </p>
      </div>
    </div>
        
   );
}

export default Login;