
import { useState } from 'react'
import Header from './components/Header'
import Title from './components/Title'
import Aside from './components/Aside'
import Main from './components/Main'
import Footer from './components/Footer'
import Buttons from './components/Buttons'
import Icons from './components/Icons'
// import home from './img/svg/home.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import './components/css/reset.css'
import './components/css/common.css'

function App() {
  const [count, setCount] = useState(0)
  console.log(Header);
  return (
    <>
      <Header />
      <Title />
      <Main />
      <Aside subject="SNS"></Aside>
      <Footer />
    </>
  );
}

export default App;
