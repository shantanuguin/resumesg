'use client';

import { useState, useEffect } from 'react';
import { User, Briefcase, Code, Cpu, Mail } from 'lucide-react';
import styles from './BottomNav.module.css';

const NAV_LINKS = [
  { label: 'About', href: '#about', icon: <User size={20} /> },
  { label: 'Work', href: '#experience', icon: <Briefcase size={20} /> },
  { label: 'Projects', href: '#projects', icon: <Code size={20} /> },
  { label: 'Skills', href: '#skills', icon: <Cpu size={20} /> },
  { label: 'Contact', href: '#contact', icon: <Mail size={20} /> },
];

export default function BottomNav() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: '-40% 0px -40% 0px',
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const offset = 20; // Minimal offset for mobile
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.container}>
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={(e) => handleClick(e, link.href)}
            >
              <div className={styles.iconWrapper}>{link.icon}</div>
              <span className={styles.label}>{link.label}</span>
              {isActive && <div className={styles.activeIndicator} />}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
