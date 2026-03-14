'use client';

import { ChevronUp } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGradient} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.brandName}>Shantanu Guin</p>
            <p className={styles.brandDesc}>Apparel Technology & Innovation</p>
          </div>
          <div className={styles.links}>
            <div className={styles.linkCol}>
              <p className={`${styles.linkLabel} eyebrow`}>Navigate</p>
              <a href="#about" className="underline-link">About</a>
              <a href="#experience" className="underline-link">Experience</a>
              <a href="#projects" className="underline-link">Projects</a>
              <a href="#skills" className="underline-link">Skills</a>
              <a href="#contact" className="underline-link">Contact</a>
            </div>
            <div className={styles.linkCol}>
              <p className={`${styles.linkLabel} eyebrow`}>Connect</p>
              <a href="https://www.linkedin.com/in/shantanu-guin-228403385/" target="_blank" rel="noopener noreferrer" className="underline-link">LinkedIn</a>
              <a href="mailto:shantanu.guin281203@gmail.com" className="underline-link">Email</a>
              <a href="https://shantanuguin.github.io/costcalc/ResSG.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">Resume</a>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p className={styles.copy}>© 2025 Shantanu Guin. All rights reserved.</p>
          <button
            className={styles.toTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
          >
            <ChevronUp size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
