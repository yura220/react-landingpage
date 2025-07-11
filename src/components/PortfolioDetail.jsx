// PortfolioDetail.jsx
import { useParams } from 'react-router-dom';
import portfolioData from './js/portfolioData';

function PortfolioDetail() {
  const { id } = useParams();
  const item = portfolioData.find(p => p.id === parseInt(id));

  if (!item) return <p>해당 작업물이 없습니다.</p>;

  return (
    <div className="wrap detail">
      <h2 className="h1">{item.title}</h2>
      <img src={item.img} alt="" />
      <p>{item.desc}</p>
      <ul>
        <li><strong>Role </strong>{item.role}</li>
        <li><strong>Skill </strong>{item.skill}</li>
        <li><strong>Day </strong>{item.day}</li>
      </ul>
    </div>
  );
}

export default PortfolioDetail;
