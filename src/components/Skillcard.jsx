import { useEffect, useRef } from "react";

function Skillcard({ title, desc, percent = 70 }) {
  const cardRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.classList.add("in-view");
      }
    }, 50); // 50ms
  }, []);

  return (
    <li
      ref={cardRef}
      className="skill_card"
      style={{ "--percent": `${percent}%` }}
    >
      <h3>{title}</h3>
      <p>{desc}</p>
    </li>
  );
}

export default Skillcard;
