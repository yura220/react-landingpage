import { Routes, Route } from "react-router-dom";
import MainAbout from './MainAbout';
import MainSkill from './MainSkill';
import MainPortfolio from './MainPortfolio';
import PortfolioDetail from './PortfolioDetail';
import MainContact from './MainContact';
import './css/Main.css';

function Main() {
  return (
    <main>
      <Routes>
        <Route path="/About" element={<MainAbout subject="ABOUT" id="About" number={1100} />} />
        <Route path="/Skill" element={<MainSkill subject="SKILL" id="Skill" />} />
        <Route path="/Portfolio" element={<MainPortfolio subject="PORTFOLIO" id="Portfolio" />} />
        <Route path="/Portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/Contact" element={<MainContact subject="CONTACT" id="Contact" />} />
      </Routes>
    </main>
  );
}

export default Main;
