'use client';

import { useEffect, useRef } from 'react';
import { ChevronDown, FileText, Linkedin, MapPin, GraduationCap } from 'lucide-react';
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
      <div className={styles.gridContainer}>
        {/* Left Side: Pastel Pink with Text */}
        <div className={styles.leftBlock}>
          <div className={styles.textContent}>
            <h1 className={styles.displayName} ref={titleRef}>
              <span className={styles.firstName}>Shantanu</span>
              <span className={styles.lastName}>Guin</span>
            </h1>

            <div className={styles.profileTag}>
              <span className={styles.tagDot} />
              <span className="mono">01 / Profile</span>
            </div>

            <div className={styles.subtitleReveal} ref={metaRef}>
              <p className={styles.subtitle}>
                Apparel Production Technology student at{' '}
                <strong>NIFT</strong> specializing in manufacturing
                optimization, factory digitalization, and automation.
              </p>

              <div className={styles.ctas}>
                <a
                  href="https://shantanuguin.github.io/costcalc/ResSG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnHeroPrimary}`}
                  ref={btn1Ref}
                >
                  <FileText size={16} />
                  <span>Resume</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shantanuguin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnHeroSecondary}`}
                  ref={btn2Ref}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <MapPin size={14} />
                <span>New Delhi, India</span>
              </div>
              <div className={styles.metaItem}>
                <GraduationCap size={14} />
                <span className="mono" style={{ fontSize: '0.75rem' }}>NIFT &apos;26</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Dark Portrait Area */}
        <div className={styles.rightBlock}>
          <div className={styles.portraitArea}>
            {/* Gradient overlay fading from pastel pink into the dark portrait */}
            <div className={styles.portraitGradient} />
            {/* Particle canvas as visual filler */}
            <ParticleCanvas />
          </div>

          {/* Frosted Glass Scroll Button */}
          <button className={styles.scrollBtn} onClick={handleScroll} aria-label="Scroll down">
            <span className={styles.scrollText}>Scroll</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Skills Marquee at Bottom */}
      <div className={styles.marqueeContainer}>
        <Marquee />
      </div>
    </section>
  );
}
