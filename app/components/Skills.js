'use client';

import { useScrollReveal, useStaggerReveal } from '../lib/animations';
import styles from './Skills.module.css';

const SKILL_CATEGORIES = [
  {
    title: 'Manufacturing & Industrial Engineering',
    skills: [
      { name: 'Industrial Engineering', desc: 'Process optimization and efficiency improvements.', level: 'expert' },
      { name: 'Manufacturing Excellence', desc: 'Driving continuous improvement in apparel production.', level: 'expert' },
      { name: 'Line Balancing', desc: 'Optimizing sewing lines for maximum throughput.', level: 'advanced' },
      { name: 'Time Study (TimeSSD)', desc: 'Conducting comprehensive time and motion studies.', level: 'advanced' },
      { name: 'Production Optimization', desc: 'Reducing changeovers and enhancing output.', level: 'advanced' },
    ],
  },
  {
    title: 'Factory Digitalization & Automation',
    skills: [
      { name: 'PowerBI', desc: 'Creating dynamic dashboards for real-time production monitoring.', level: 'expert' },
      { name: 'Workflow Digitization', desc: 'Converting manual reporting to efficient digital apps (PWAs).', level: 'advanced' },
      { name: 'Advanced Excel & VBA', desc: 'Data manipulation and workflow automation.', level: 'advanced' },
      { name: 'Data Visualization', desc: 'Translating complex production data into actionable insights.', level: 'expert' },
      { name: 'Google Apps Script', desc: 'Automating tasks within Google Workspace.', level: 'proficient' },
    ],
  },
  {
    title: 'Engineering & Design Tools',
    skills: [
      { name: 'AutoCAD 3D & Fusion 360', desc: 'Drafting and designing mechanical layouts and parts.', level: 'advanced' },
      { name: 'CLO3D, TukaCAD, Lectra', desc: '2D and 3D digital pattern making and apparel simulation.', level: 'advanced' },
      { name: 'Blender & Figma', desc: '3D modeling and UI/UX design for web applications.', level: 'proficient' },
    ],
  },
  {
    title: 'Programming & Hardware',
    skills: [
      { name: 'Python, HTML5, CSS, JS', desc: 'Applying full-stack development skills to web applications.', level: 'advanced' },
      { name: 'React & Bootstrap', desc: 'Building responsive frontend solutions.', level: 'advanced' },
      { name: 'Arduino & Raspberry Pi', desc: 'Prototyping IoT devices and automated hardware.', level: 'advanced' },
      { name: 'Android Development', desc: 'Creating native mobile applications.', level: 'proficient' },
    ],
  },
];

const LANGUAGES = [
  { name: 'English', level: 'Fluent' },
  { name: 'Hindi', level: 'Fluent' },
  { name: 'Bengali', level: 'Native' },
  { name: 'Tamil', level: 'Beginner' },
];

const LEVEL_LABELS = { expert: 'Expert', advanced: 'Advanced', proficient: 'Proficient' };

function SkillCategory({ cat }) {
  const ref = useStaggerReveal();
  return (
    <div className={styles.category}>
      <h3 className={styles.catTitle}>{cat.title}</h3>
      <div className={styles.catGrid} ref={ref}>
        {cat.skills.map((skill, si) => (
          <div key={si} className={`${styles.skillCard} card`}>
            <h4 className={styles.skillName}>{skill.name}</h4>
            <p className={styles.skillDesc}>{skill.desc}</p>
            <span className={`proficiency-tag proficiency-${skill.level}`}>
              {LEVEL_LABELS[skill.level]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headingRef = useScrollReveal();

  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <h2 className={`section-heading ${styles.heading} reveal`} ref={headingRef}>
          Core Competencies
        </h2>

        {SKILL_CATEGORIES.map((cat, ci) => (
          <SkillCategory key={ci} cat={cat} />
        ))}

        <div className={styles.languages}>
          <h3 className={styles.catTitle}>Languages</h3>
          <div className={styles.langGrid}>
            {LANGUAGES.map((lang, i) => (
              <div key={i} className={`${styles.langCard} card`}>
                <strong className={styles.langName}>{lang.name}</strong>
                <span className={styles.langLevel}>{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
