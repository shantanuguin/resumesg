'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TrendingUp, CheckCircle, ShieldCheck, Zap, FileText, Linkedin, MapPin, GraduationCap } from 'lucide-react';
import { useCounter, useMagnetic, useStaggerReveal, useParallax, useTextScramble } from '../lib/animations';
import ParticleCanvas from './ParticleCanvas';
import Marquee from './Marquee';
import styles from './Hero.module.css';

const ACHIEVEMENTS = [
  { value: 64, label: 'Reduction in Sewing Line Changeover Time (%)', icon: <TrendingUp size={24} /> },
  { value: 15, label: 'Increase in First-Hour Production Efficiency', icon: <Zap size={24} /> },
  { value: 45, label: 'Reduction in Projected Critical Sewing Defects', icon: <CheckCircle size={24} /> },
  { value: 100, label: 'Workflow Digitization & Paperless Reporting (%)', icon: <ShieldCheck size={24} /> },
];

function AchievementCard({ value, label, icon, delay }) {
  const counterRef = useCounter(value);
  const labelRef = useTextScramble(label);

  return (
    <div className={styles.achievement} style={{ transitionDelay: `${delay}s` }}>
      <div className={styles.achievementIcon}>{icon}</div>
      <div className={styles.achievementTextWrapper}>
        <p className={styles.achievementValue} ref={counterRef}>0%</p>
        <p className={styles.achievementLabel} ref={labelRef}>{label}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const titleRef = useStaggerReveal();
  const metaRef = useStaggerReveal();
  const btn1Ref = useMagnetic();
  const btn2Ref = useMagnetic();
  const achievementsRef = useParallax(-0.1);

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

          <div className={`heroAchievements ${styles.heroAchievements}`} ref={achievementsRef}>
            <h2 className={styles.achievementsTitle}>Key Achievements</h2>
            <div className={styles.achievementsGrid}>
              {ACHIEVEMENTS.map((a, i) => (
                <AchievementCard key={i} {...a} delay={0.1 + i * 0.1} />
              ))}
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
