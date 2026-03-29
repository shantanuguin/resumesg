'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMagnetic, useStaggerReveal, useParallax } from '../lib/animations';
import { useTilt } from '../lib/useTilt';
import ParticleCanvas from './ParticleCanvas';
import Marquee from './Marquee';
import styles from './Hero.module.css';

export default function Hero() {
  const titleRef = useStaggerReveal();
  const metaRef = useStaggerReveal();
  const btn1Ref = useMagnetic();
  const btn2Ref = useMagnetic();

  const handleScroll = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Absolute Overlapping Name */}
      <div className={styles.nameContainer}>
        <h1 className={styles.displayName} ref={titleRef}>
          <span className={styles.firstName}>Shantanu</span>
          <span className={styles.lastName}>Guin</span>
        </h1>
      </div>

      <div className={styles.splitLayout}>
        {/* Left Side: 55% */}
        <div className={styles.leftBlock}>
          <div className={styles.textContent}>
            <div className={styles.profileTag}>
              <span className={styles.tagDot} />
              <span className="mono">01 / Profile</span>
            </div>

            <div className={styles.subtitleReveal} ref={metaRef}>
              <p className={styles.subtitle}>
                Apparel Production Technology student at <strong className={styles.darkText}>NIFT</strong> specializing in manufacturing optimization, factory digitalization, and automation.
              </p>

              <div className={styles.ctas}>
                <a
                  href="https://shantanuguin.github.io/costcalc/ResSG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnHeroPrimary}`}
                  ref={btn1Ref}
                >
                  <span>Resume</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shantanuguin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnHeroSecondary}`}
                  ref={btn2Ref}
                >
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span>New Delhi, India</span>
              </div>
              <div className={styles.metaItem}>
                <span>NIFT &apos;26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: 45% */}
        <div className={styles.rightBlock}>
          {/* Reference uses a specific image URL */}
          <img 
            src="/portrait.png" 
            alt="Shantanu Guin Portrait" 
            className={styles.portraitImg} 
          />
          <div className={styles.portraitGradient} />
          
          <button className={styles.scrollBtn} onClick={handleScroll} aria-label="Scroll down">
            <span className={styles.scrollText}>Scroll</span>
            <ChevronDown size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className={styles.marqueeContainer}>
        <Marquee />
      </div>
    </section>
  );
}
