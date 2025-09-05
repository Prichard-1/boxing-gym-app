import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

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

