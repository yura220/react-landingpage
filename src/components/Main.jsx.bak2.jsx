import MainAbout from './MainAbout'
import MainSkill from './MainSkill'
import MainPortfolio from './MainPortfolio'
import MainContact from './MainContact'
import './css/Main.css'

function Main() {
  return (
    <main>
      <MainAbout subject="About" id={'About'} number={100}></MainAbout>
      <MainSkill subject="Skill" id={'Skill'}></MainSkill>
      <MainPortfolio subject="Portfolio" id={'Portfolio'}></MainPortfolio>
      <MainContact subject="Contact" id={'Contact'}></MainContact>
    </main>
  );
}

export default Main;