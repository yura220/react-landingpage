// Footer.jsx
import React from 'react';
import './css/Main.css'; // 예시

export default function Footer({ isHome }) {
  return (
    <footer className={isHome ? 'footer home-footer' : 'footer'}>
      <hr />
      <p>&copy; 2025 Yura Kyung. All rights reserved.</p>
    </footer>
  );
}