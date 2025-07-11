// MainPortfolio.jsx
import { Link } from 'react-router-dom';
import portfolioData from './js/portfolioData';
import Counter from './Counter';

function MainPortfolio({ subject, id }) {
  return (
    <section id={id}>
      <div className="wrap">
        <h2 className="h1">{subject}</h2>
        <div className="p_box">
          {portfolioData.map((item) => (
          <article key={item.id}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="img-box">
                <img src={item.img} alt={item.title} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </a>
            <ul>
              <li><strong>Role </strong>{item.role}</li>
              <li><strong>Skill </strong>{item.skill}</li>
              <li><strong>Day </strong>{item.day}</li>
            </ul>
            <Counter icon="🤍" id={item.id} />
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}
export default MainPortfolio;
