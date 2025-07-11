import './css/Header.css'

function Header() {
  return (
    <header>
      <div className="wrap">
        <h1>My Landing Page</h1>
        <ul className="flex">
          <li><a href="" className="block">ABOUT</a></li>
          <li><a href="" className="block">SKILL</a></li>
          <li><a href="" className="block">PORTFOLIO</a></li>
          <li><a href="" className="block">CONTACT</a></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;