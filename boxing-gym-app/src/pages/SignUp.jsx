import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function Sign_Up(){
    const[email, setEmail]=useState("");
    const[password, setPassword]=useState("");
    const navigate= useNavigate();

    const HandleSign_Up =(e) =>{
        e.preventDefault();
        const newUser = {email, password};
        lovalStorage.setItem("user", JSON.stringify(newUser));
        alert("Sign_Up successful, Please log in");
        navigate("/Login");
    };
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white shadow-x1 rounded-2x1 p-8 w-full max-w-md">
            <h2 className="text-2x1 font-bold text-center mb-6">Sign_up </h2>

            <form onSubmit={handleSign_Up} className="space-y-4">
                <div>
                    <label className="block text-gray-700 text-sm mb-1">Email</label>
                    <input
                     type="email"
                     value={email}
                     onChange={(e)=> setEmail(e.target.value)}
                     placeholder="Enter your email"
                     className="w-full border rounded-1g px-2 focus:ring-green-500 outline-none"
                     required/> 
                </div>
                <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-1g fornt-semibold hover:bg-green-700 transitio"
                >
                    Sign Up
                </button>
            </form>
            <p clasName="mt-4 text-center text-sm">
                already have an account?{""}
                <Link to="/Login" className="text-green-600 hover:underline">
                Login  here
                </Link>
            </p>
        </div>
     </div>
    );
}
export default Sign_Up;





