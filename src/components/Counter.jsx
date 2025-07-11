import { useState, useEffect } from "react";
import './css/Counter.css'

const Counter = ({ icon = "❤️", id }) => {
  const storageKey = `counter_${id}`;
  const [count, setCount] = useState(0);

  // 로컬스토리지에서 초기값 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) {
      setCount(parseInt(saved, 10));
    }
  }, [storageKey]);

  const handleClick = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(storageKey, newCount);
  };

  return (
    <div className="Counter">
      <button onClick={handleClick}>
        {icon} {count}
      </button>
    </div>
  );
};

export default Counter;
