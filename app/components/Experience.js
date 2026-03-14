'use client';

import { useScrollReveal, useStaggerReveal, useHeadingMorph } from '../lib/animations';
import styles from './Experience.module.css';

const WORK_EXPERIENCE = [
  {
    date: 'Dec 2025 – Apr 2026',
    company: 'Sidney Apparels LLC – QVE Group Jordan',
    role: 'Manufacturing Excellence – Management Trainee',
    points: [
      <>Developed a <strong>Progressive Web App (PWA)</strong> to digitize and manage sewing line changeovers, reducing changeover time from <strong>81× SMV to 29× SMV</strong>.</>,
      <>Designed and implemented standardized <strong>Quick Changeover SOPs</strong> and workflows to streamline coordination between production, maintenance, and line setup teams.</>,
      <>Engineered a digital <strong>Skill Matrix platform</strong> to evaluate operators and operations, enabling identification of <strong>multi-skilled operators</strong>.</>,
      <>Digitized manual startup-loss recording workflows, replacing a <strong>15-row Excel process</strong> with a <strong>4-button real-time PWA</strong> interface.</>,
      <>Built a <strong>Flutter-based production planning calendar</strong> to visualize and coordinate monthly style changeovers across planning, maintenance, quality, and production teams.</>,
    ],
  },
  {
    date: 'July 2025 – Aug 2025',
    company: 'Vamani Overseas Pvt. Ltd.',
    role: 'Apparel Production & Quality Intern',
    points: [
      <>Boosted first-hour production efficiency by <strong>15%</strong> through the development of <strong>PowerBI dashboards</strong> for production monitoring and decision support.</>,
      <>Reduced daily production meeting time from <strong>1.5 hours to 40 minutes</strong> by digitizing reporting workflows.</>,
      <>Conducted <strong>root cause analysis</strong> on <strong>200+ rejected garments</strong> to identify recurring defect patterns and bolster quality control.</>,
    ],
  },
  {
    date: 'June 2025',
    company: 'Lila Vastra',
    role: 'Apparel Production & Process Improvement Intern',
    points: [
      <>Reduced projected sewing defects by <strong>45%</strong> on a FabIndia kurta production line through <strong>time and motion study</strong> analysis and implementation of refined operational SOPs.</>,
    ],
  },
  {
    date: 'June 2024 – July 2024',
    company: 'Vardhman Textiles Pvt. Ltd.',
    role: 'Textile Manufacturing Trainee',
    points: [
      <>Completed comprehensive training across textile manufacturing stages including <strong>fiber processing, spinning, weaving</strong>, and fabric finishing.</>,
    ],
  },
];

const LEADERSHIP = [
  {
    date: 'Ongoing',
    company: 'NIFT Central Placement Coordination',
    role: 'Student Head',
    points: [
      <>Led a <strong>120+ member</strong> student team managing centralized placement coordination across <strong>18 NIFT campuses</strong>.</>,
      <>Facilitated recruitment opportunities for <strong>hundreds of students</strong>.</>,
    ],
  },
  {
    date: 'Ongoing',
    company: 'Social Club, NIFT',
    role: 'Secretary & President',
    points: [
      <>Managed a <strong>100-member</strong> organizing team and delivered <strong>12+ large-scale events</strong> for 500+ participants.</>,
      <>Collaborated with NGOs including <strong>BloodConnect</strong>, Tapas Foundation, and <strong>AIESEC IIT Delhi</strong>.</>,
    ],
  },
];

const EDUCATION = [
  {
    date: '2022 – 2026',
    company: 'National Institute of Fashion Technology (NIFT) — New Delhi',
    role: 'B.F.Tech – Apparel Production Technology',
    points: [
      <>Minor: <strong>Display & Presentation Design</strong> (Fashion Communication)</>,
      <>CGPA: <strong>8.6</strong></>,
    ],
  },
  {
    date: '2020 – 2022',
    company: 'CBSE Secondary Education',
    role: 'Class 12 (PCM) & Class 10',
    points: [],
  },
];

function TimelineItem({ item }) {
  return (
    <div className={styles.timelineItem}>
      <div className={styles.dot} />
      <div className={styles.content}>
        <span className={`${styles.datePill} mono`}>{item.date}</span>
        <div className={`${styles.card} card`}>
          <h3 className={styles.company}>{item.company}</h3>
          <p className={styles.role}>{item.role}</p>
          {item.points.length > 0 && (
            <ul className={styles.points}>
              {item.points.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function TimelineSection({ title, items }) {
  const contentRef = useStaggerReveal();
  const { sectionRef, headingRef, horizontalRef } = useHeadingMorph();

  return (
    <div className={styles.timelineSection} ref={sectionRef}>
      <div className={styles.stickyHeader} ref={horizontalRef}>{title}</div>
      <div className={styles.contentWrapper}>
        <div className={styles.sideLabelContainer} ref={headingRef}>
          <span className={styles.sideLabelSpan}>{title}</span>
        </div>
        <div className={styles.timelineBody}>
          <div className={styles.timeline} ref={contentRef}>
            {items.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const headingRef = useScrollReveal();

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className={`section-heading ${styles.heading} reveal`} ref={headingRef}>
          Experience &amp; Education
        </h2>
        <TimelineSection title="Work Experience" items={WORK_EXPERIENCE} />
        <TimelineSection title="Leadership" items={LEADERSHIP} />
        <TimelineSection title="Education" items={EDUCATION} />
      </div>
    </section>
  );
}
