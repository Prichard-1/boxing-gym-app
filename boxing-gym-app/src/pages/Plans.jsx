import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
        const res = await axios.get(`${baseURL}/api/plans`);
        console.log("Plans response:", res.data);

        if (Array.isArray(res.data)) {
          setPlans(res.data);
        } else {
          console.warn("Unexpected response format:", res.data);
          setPlans([]);
          setError('Invalid data format received from server.');
        }
      } catch (err) {
        console.error("Error fetching plans:", err);
        setError('Failed to load membership plans.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubscribe = async (planId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to subscribe.');
      navigate('/login');
      return;
    }

    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '');
      await axios.post(`${baseURL}/api/subscribe`, { planId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/booksession');
    } catch (err) {
      console.error('Subscription failed:', err);
      if (err.response?.status === 403) {
        alert('Access denied. Please log in again or check your account.');
      } else {
        alert('Subscription failed. Please try again.');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>

      {loading && <p className="text-gray-500">Loading plans...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4">
        {Array.isArray(plans) && plans.length > 0 ? (
          plans.map((plan) => (
            <div key={plan.id} className="border p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p>{plan.description}</p>
              <p className="font-bold">R{plan.price}/month</p>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Subscribe
              </button>
            </div>
          ))
        ) : (
          !loading && !error && (
            <p className="text-gray-500">No plans available at the moment.</p>
          )
        )}
      </div>
    </div>
  );
}
