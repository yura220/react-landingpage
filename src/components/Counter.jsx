// src\components\Counter.jsx
import { useState, useEffect } from "react";
import './css/Counter.css'

const API_BASE = "http://localhost:3001";

const Counter = ({ icon = "❤️", id }) => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // MongoDB에서 초기값 불러오기
  useEffect(() => {
    const fetchCount = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/api/counters/${id}`);

        // 응답 상태 확인
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Server response:', response.status, errorText);
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }

        // Content-Type 확인
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const responseText = await response.text();
          console.error('Non-JSON response:', responseText);
          throw new Error('Server returned non-JSON response');
        }

        const data = await response.json();
        setCount(data.count || 0);
        setLastUpdated(data.updatedAt);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);

        // 에러 시 로컬스토리지 fallback
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
      // 낙관적 업데이트
      const optimisticCount = count + 1;
      setCount(optimisticCount);

      // MongoDB에 원자적 증가 요청
      const response = await fetch(`/api/counters/${id}/increment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Increment error:', response.status, errorText);
        throw new Error(`Failed to increment counter: ${response.status}`);
      }

      // Content-Type 확인
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Non-JSON response:', responseText);
        throw new Error('Server returned non-JSON response');
      }

      // 서버에서 실제 값 받아서 동기화
      const data = await response.json();
      setCount(data.count);
      setLastUpdated(data.updatedAt);

      // 로컬스토리지 백업
      localStorage.setItem(`counter_${id}`, data.count);

    } catch (err) {
      console.error('Counter increment failed:', err);
      // 에러 시 롤백
      setCount(count);
      setError(err.message);

      // 로컬 증가로 fallback
      const fallbackCount = count + 1;
      setCount(fallbackCount);
      localStorage.setItem(`counter_${id}`, fallbackCount);
    }
  };

  // 카운터 리셋 함수 (선택사항)
  const handleReset = async () => {
    try {
      setError(null);
      const response = await fetch(`/api/counters/${id}/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reset counter');
      }

      const data = await response.json();
      setCount(data.count);
      setLastUpdated(data.updatedAt);
      localStorage.setItem(`counter_${id}`, data.count);

    } catch (err) {
      setError(err.message);
      console.error('Counter reset failed:', err);
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