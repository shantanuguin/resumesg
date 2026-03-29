'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/theme';
import { useMagnetic } from '../lib/animations';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
];

function NavLink({ link, onClick, isActive }) {
  const ref = useMagnetic();
  return (
    <a
      ref={ref}
      href={link.href}
      className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
      onClick={(e) => onClick(e, link.href)}
    >
      <span className={styles.linkText}>{link.label}</span>
    </a>
  );
}

export default function Navbar() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      setScrolled(curr > 40);
      // Hide only when scrolling DOWN past the hero, show when scrolling UP
      if (curr > window.innerHeight) {
        setIsHidden(curr > lastScroll);
      } else {
        setIsHidden(false); // Always visible on hero
      }
      lastScroll = curr;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section via IntersectionObserver
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
          rootMargin: '-30% 0px -60% 0px', // fires when section is in the middle ~30% of viewport
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${isHidden ? styles.hidden : ''}`}>
        <div className={styles.inner}>
          <a
            href="#hero"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className={styles.logoDash}>—</span>
            <span className={styles.logoText}>Apparel Tech & Innovation</span>
          </a>

          <div className={styles.links}>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                onClick={handleNavClick}
                isActive={activeSection === link.href.replace('#', '')}
              />
            ))}
          </div>

          <div className={styles.actions}>
            <a
              href="#contact"
              className={styles.contactPill}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Get in Touch
            </a>

            {mounted && (
              <button
                className={styles.themeBtn}
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>
            )}

            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
              <span className={`${styles.hamburgerLine} ${mobileOpen ? styles.open : ''}`} />
            </button>
          </div>
        </div>

        {/* Animated gradient line */}
        <div className={styles.gradientLine} />
      </nav>

      {/* Mobile menu overlay */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${activeSection === link.href.replace('#', '') ? styles.mobileLinkActive : ''}`}
              style={{ transitionDelay: `${i * 0.06}s` }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
