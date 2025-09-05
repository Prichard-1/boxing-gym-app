import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${BASE_URL}/api/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const sorted = res.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setBookings(sorted);
    } catch (err) {
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async ({ session, date }) => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You must be logged in to book a session.');

      await axios.post(`${BASE_URL}/api/bookings`, { session, date }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchBookings();
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, loading, error, createBooking };
}
