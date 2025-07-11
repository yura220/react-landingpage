// App.jsx

import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from './components/Header';
import Title from './components/Title';
import Main from './components/Main';
import Footer from './components/Footer';
import Aside from './components/Aside';
import './App.css';
import './components/css/reset.css';
import './components/css/common.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isContact = location.pathname === '/Contact';

  useEffect(() => {
    const cursor = document.querySelector('.cursor-effect');
    if (!cursor) return;

    const handleMouseMove = (e) => {
      const hovered = document.elementFromPoint(e.clientX, e.clientY);
      if (hovered && hovered.tagName === 'BUTTON') {
        cursor.style.opacity = '0';
      } else {
        cursor.style.opacity = '1';
      }
      cursor.style.transform = `translate(${e.clientX - 60}px, ${e.clientY - 60}px)`;
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="cursor-effect"></div>
      <Header />
      {isHome && <Title />}
      {!isHome && <Main />}
      {isContact && <Aside subject="SNS" />}
      <Footer isHome={isHome} />
    </>
  );
}

// App 자체에서 Router로 감싸야 함
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
