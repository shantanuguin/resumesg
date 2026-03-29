'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Briefcase, FolderGit2, Cpu, Send, FileText, Linkedin, MapPin, GraduationCap } from 'lucide-react';
import { useCounter, useMagnetic, useStaggerReveal, useParallax, useTextScramble } from '../lib/animations';
import { useTilt } from '../lib/useTilt';
import ParticleCanvas from './ParticleCanvas';
import Marquee from './Marquee';
import styles from './Hero.module.css';

const HERO_NAVS = [
  { label: 'Work Experience', href: '#experience', icon: <Briefcase size={20} /> },
  { label: 'Projects & Work', href: '#projects', icon: <FolderGit2 size={20} /> },
  { label: 'Skills & Tech', href: '#skills', icon: <Cpu size={20} /> },
  { label: 'Get in Touch', href: '#contact', icon: <Send size={20} /> },
];

export default function Hero() {
  const titleRef = useStaggerReveal();
  const metaRef = useStaggerReveal();
  const btn1Ref = useMagnetic();
  const btn2Ref = useMagnetic();
  const achievementsRef = useParallax(-0.1);
  const tiltRef = useTilt({ maxTilt: 5, scale: 1.02, speed: 400 });

  return (
    <section id="hero" className={styles.hero}>
      {/* Particle background */}
      <ParticleCanvas />

      <div className={styles.heroContent}>
        <div className={styles.heroMain}>
          <div className={styles.heroText}>
            <p className={`${styles.eyebrow} eyebrow`}>Apparel Technology & Innovation</p>
            <h1
              className={`${styles.displayName} display-heading`}
              ref={titleRef}
            >
              <div className="word" style={{ transformOrigin: '0 100%' }}>Shantanu</div>
              <div className={`word ${styles.nameAccent}`} style={{ transformOrigin: '0 100%' }}>Guin</div>
            </h1>
            <div className={styles.subtitleReveal} ref={metaRef}>
              <p className={styles.subtitle}>
                Apparel Production Technology student at <strong>NIFT</strong> specializing
                in manufacturing optimization, factory digitalization, and automation
                in apparel production systems.
              </p>
              <div className={styles.ctas}>
                <a
                  href="https://shantanuguin.github.io/costcalc/ResSG.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  ref={btn1Ref}
                >
                  <FileText size={18} />
                  <span>Resume</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/shantanuguin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  ref={btn2Ref}
                >
                  <Linkedin size={18} />
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

          <div className={styles.achievementsWrapper} ref={achievementsRef}>
            <div className={`heroNavCard ${styles.heroNavCard}`} ref={tiltRef}>
              <h2 className={styles.achievementsTitle}>Explore Portfolio</h2>
              <div className={styles.heroNavGrid}>
                {HERO_NAVS.map((nav, i) => (
                  <a key={i} href={nav.href} className={styles.heroNavLink} onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(nav.href)?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    <span className={styles.heroNavIcon}>{nav.icon}</span>
                    <span className={styles.heroNavText}>{nav.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.marqueeContainer}>
        <Marquee />
      </div>
    </section>
  );
}
