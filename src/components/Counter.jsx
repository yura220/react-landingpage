// src/components/Counter.jsx
import { useState, useEffect } from "react";
import './css/Counter.css';

const API_BASE = "https://react-landingpage-oquo.onrender.com";

const Counter = ({ icon = "❤️", id }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/counters/${id}`);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', response.status, errorText);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const responseText = await response.text();
          console.error('Non-JSON response:', responseText);
          throw new Error('Server returned non-JSON response');
        }

        const data = await response.json();
        setCount(data.count || 0);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);

        const saved = localStorage.getItem(`counter_${id}`);
        if (saved !== null) {
          setCount(parseInt(saved, 10));
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCount();
    }
  }, [id]);

  const handleClick = async () => {
    try {
      setError(null);
      const optimisticCount = count + 1;
      setCount(optimisticCount);

      const response = await fetch(`${API_BASE}/api/counters/${id}/increment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Increment error:', response.status, errorText);
        throw new Error(`Failed to increment counter: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      setCount(data.count);
      localStorage.setItem(`counter_${id}`, data.count);

    } catch (err) {
      console.error('Counter increment failed:', err);
      setError(err.message);

      const fallbackCount = count + 1;
      setCount(fallbackCount);
      localStorage.setItem(`counter_${id}`, fallbackCount);
    }
  };

  if (isLoading) {
    return (
      <div className="Counter">
        <button disabled>
          {icon} ...
        </button>
      </div>
    );
  }

  return (
    <div className="Counter">
      <button onClick={handleClick} disabled={isLoading}>
        {icon} {count}
      </button>
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
};

export default Counter;
