import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/plans`);
        setPlans(res.data);
      } catch (err) {
        console.error('Error fetching plans:', err);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>
      <div className="space-y-4">
        {plans.map((plan) => (
          <div key={plan.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{plan.name}</h3>
            <p>{plan.description}</p>
            <p className="font-bold">R{plan.price}/month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
