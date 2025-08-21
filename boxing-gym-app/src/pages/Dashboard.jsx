import { useEffect} from "react";
import { useNavigate} from "react-router-dom";

function Dashboard(){
    const navigate =useNavigate();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user){
            navigate("/Login");
        }   
    }, [navigate]);
    const hangleLogout =()=> {
        localStorage.removeItem("user");
        navigate("/Login");
    };
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-x1 shadow-1g w-full max-w-1g text-center">
                <h2 className="mb-4"> Welcome to your Dashboard🥊</h2>
                <p className="mb-6">Manage your bookings, payments and workouts.</p>
                <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-1g hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}
export default Dashboard;