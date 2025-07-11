import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; //useNavigate로 프로그래밍 방식 이동
import './css/Header.css'
function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="wrap">
        <h1 onClick={() => navigate('/')}>My Landing Page</h1>
        <ul className="flex">
          <li><Link to="/About" className="nav-text">About</Link></li>
          <li><Link to="/Skill" className="nav-text">Skill</Link></li>
          <li><Link to="/Portfolio" className="nav-text">Portfolio</Link></li>
          <li><Link to="/Contact" className="nav-text">Contact</Link></li>
          {/* <li><button onClick={() => navigate('/About')} className="nav-text">About</button></li>
          <li><button onClick={() => navigate('/Skill')} className="nav-text">Skill</button></li>
          <li><button onClick={() => navigate('/Portfolio')} className="nav-text">Portfolio</button></li>
          <li><button onClick={() => navigate('/Contact')} className="nav-text">Contact</button></li> */}
        </ul>
      </div>
    </header>
  );
}

export default Header;