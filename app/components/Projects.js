'use client';

import { useScrollReveal, useStaggerReveal, useCounter } from '../lib/animations';
import { Camera, User, Image, Film, Star, TrendingUp, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import styles from './Projects.module.css';

const ACHIEVEMENTS = [
  { value: 64, label: 'Reduction in Sewing Line Changeover Time (%)', icon: <TrendingUp size={24} /> },
  { value: 15, label: 'Increase in First-Hour Production Efficiency', icon: <Zap size={24} /> },
  { value: 45, label: 'Reduction in Projected Critical Sewing Defects', icon: <CheckCircle size={24} /> },
  { value: 100, label: 'Workflow Digitization & Paperless Reporting (%)', icon: <ShieldCheck size={24} /> },
];

const PROJECTS = [
  {
    title: 'PWA for Sewing Line Changeovers',
    description: 'Developed a Progressive Web App (PWA) to digitize and manage sewing line changeovers at Sidney Apparels, reducing downtime significantly.',
    link: 'https://changeover-app.vercel.app',
    tags: ['Progressive Web App', 'Workflow Digitization'],
    featured: true,
  },
  {
    title: 'Smart Skill Matrix System',
    description: 'Engineered a digital Skill Matrix platform to evaluate operators and operations, enabling identification of multi-skilled operators for enhanced line balancing.',
    link: 'https://shantanuguin.github.io/skillmatrix',
    tags: ['Data Visualization', 'Line Balancing', 'Apparel Tech'],
    featured: true,
  },
  {
    title: 'Live Project: Budget Calculator',
    description: 'Developed a web-based cost planning tool using HTML, Tailwind CSS, and JS. This calculator automates production budgets, reducing planning time by 30%.',
    link: 'https://shantanuguin.github.io/costcalc/Web.html',
    tags: ['Tool Development', 'JS', 'FinTech'],
  },
  {
    title: 'RFID-Based Smart Inventory',
    description: 'Designed a Just-in-Time (JIT) inventory system using RFID tracking to optimize material flow and maximize handling efficiency by 60%.',
    link: '',
    tags: ['RFID', 'JIT', 'IoT'],
  },
  {
    title: 'Automated Guided Vehicle (AGV) Prototype',
    description: 'Engineered a small-scale AGV system and custom Arduino-based automation hardware for factory material movement and logistics automation.',
    link: '',
    tags: ['AGV', 'Arduino', 'Robotics'],
  },
  {
    title: 'MycoReishi Life Cycle Assessment',
    description: 'Performed a full Life Cycle Assessment (LCA) research project on MycoReishi mycelium to scientifically quantify its environmental benefits as a leather alternative.',
    link: '',
    tags: ['Sustainability', 'LCA', 'Research'],
  },
];

const CREATIVE = [
  { title: 'Product Photography', icon: <Camera size={24} />, link: 'https://photos.app.goo.gl/nyDzJkfkcT5nNNJ5A' },
  { title: 'Portrait Photography', icon: <User size={24} />, link: 'https://photos.app.goo.gl/Zg1AoYuj6o8Nd1EW8' },
  { title: 'General Photography', icon: <Image size={24} />, link: 'https://photos.app.goo.gl/JHAuD1dJL9E5gZ2Y7' },
];

const VIDEOS = [
  { title: 'Podcast Ep. 1', link: 'https://youtu.be/rfUBBHDLe5E' },
  { title: 'Podcast Ep. 2', link: 'https://youtu.be/oM3ArWFa9BM' },
  { title: 'Instagram Reel 1', link: 'https://www.instagram.com/share/reel/__SEuFyCU' },
  { title: 'Instagram Reel 2', link: 'https://www.instagram.com/share/reel/BAJL-H33Xu' },
  { title: 'Short Film', link: 'https://photos.app.goo.gl/3PTiGmHgxtnqXdgv5' },
];

function AchievementCard({ value, label, icon }) {
  const counterRef = useCounter(value);
  return (
    <div className={styles.achievementStat}>
      <div className={styles.achievementIcon}>{icon}</div>
      <div className={styles.achievementText}>
        <h4 ref={counterRef}>0%</h4>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default function Projects() {
  const headingRef = useScrollReveal();
  const gridRef = useStaggerReveal();
  const creativeRef = useScrollReveal();

  return (
    <section id="projects" className={`section ${styles.projects}`}>
      <div className={styles.achievementsRow}>
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementCard key={i} {...a} />
        ))}
      </div>

      <div className="container">
        <h2 className={`section-heading ${styles.heading} reveal`} ref={headingRef}>
          Projects & Research
        </h2>

        <div className={`${styles.grid} stagger`} ref={gridRef}>
          {PROJECTS.map((project, i) => (
            <div key={i} className={`${styles.card} card reveal`} style={{ '--i': i }}>
              {project.featured && (
                <span className={styles.featured}>
                  <Star size={14} fill="currentColor" />
                  Featured
                </span>
              )}
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDesc}>{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.cardLink} underline-link`}
                >
                  View Live Tool →
                </a>
              )}
              <div className={styles.tags}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Creative Portfolio */}
        <div className={styles.creative} ref={creativeRef}>
          <h3 className={`section-heading ${styles.creativeHeading} reveal`}>
            Creative Portfolio
          </h3>
          <div className={styles.creativeGrid}>
            {CREATIVE.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.creativeCard} card reveal`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <span className={styles.creativeIcon}>{item.icon}</span>
                <span className={styles.creativeTitle}>{item.title}</span>
              </a>
            ))}
            <div className={`${styles.creativeCard} ${styles.videoCard} card reveal`} style={{ transitionDelay: '0.3s' }}>
              <span className={styles.creativeIcon}><Film size={24} /></span>
              <span className={styles.creativeTitle}>Videos & Podcasts</span>
              <div className={styles.videoLinks}>
                {VIDEOS.map((v, i) => (
                  <a
                    key={i}
                    href={v.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.videoLink} underline-link`}
                  >
                    {v.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
