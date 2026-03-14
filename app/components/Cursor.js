'use client';

import { useEffect, useState } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener('mousemove', mMove);
      document.addEventListener('mouseenter', mEnter);
      document.addEventListener('mouseleave', mLeave);
      document.addEventListener('mousedown', mDown);
      document.addEventListener('mouseup', mUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mMove);
      document.removeEventListener('mouseenter', mEnter);
      document.removeEventListener('mouseleave', mLeave);
      document.removeEventListener('mousedown', mDown);
      document.removeEventListener('mouseup', mUp);
    };

    const mMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    const mLeave = () => setHidden(true);
    const mEnter = () => setHidden(false);
    const mDown = () => setClicked(true);
    const mUp = () => setClicked(false);

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  useEffect(() => {
    const handleLinkHoverEvents = () => {
      document.querySelectorAll('a, button, input').forEach((el) => {
        el.addEventListener('mouseover', () => setLinkHovered(true));
        el.addEventListener('mouseout', () => setLinkHovered(false));
      });
    };

    handleLinkHoverEvents();
    
    // Setup observer for dynamically added elements
    const observer = new MutationObserver(() => {
      handleLinkHoverEvents();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Use a softer mix-blend-mode if light theme
  return (
    <div
      className={`${styles.cursor} ${hidden ? styles.hidden : ''} ${
        clicked ? styles.clicked : ''
      } ${linkHovered ? styles.linkHovered : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
