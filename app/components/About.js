'use client';

import { useAboutReveal } from '../lib/animations';
import styles from './About.module.css';

function DetailCard({ eyebrow, text }) {
  return (
    <div className={styles.detailCard}>
      <p className="eyebrow">{eyebrow}</p>
      <p className={styles.detailText}>{text}</p>
    </div>
  );
}

export default function About() {
  const { wrapperRef, textRef, cardsRef } = useAboutReveal({
    initialOpacity: 0.12,
    blurAmount: 5,
  });

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className={styles.pinWrapper} ref={wrapperRef}>
        <div className={`container ${styles.inner}`}>
          <p className={styles.intro} ref={textRef}>
            <span className={styles.dash}>—</span>
            As an Apparel Production Technology student at <strong>NIFT</strong>, I bring together{' '}
            <strong>analytical engineering</strong> with a{' '}
            <strong>keen eye for aesthetics</strong>. I specialize in{' '}
            <strong>manufacturing optimization</strong>, factory digitalization, and automation. My
            work focuses on developing digital tools and workflows to elevate
            factory efficiency, such as reducing{' '}
            <strong>sewing line changeover times</strong> in high-volume export environments.
          </p>
          <div className={styles.details} ref={cardsRef}>
            <DetailCard
              eyebrow="Manufacturing Excellence"
              text="Industrial Engineering, Line Balancing, Time Study, and Production Optimization in high-volume export environments."
            />
            <DetailCard
              eyebrow="Digitalization & Automation"
              text="PowerBI, Advanced Excel, VBA, Workflow Digitization, AGV Prototyping, and developing Progressive Web Apps (PWAs)."
            />
            <DetailCard
              eyebrow="Leadership"
              text="Student Head, NIFT Central Placement Coordination (120+ member team) & President, Social Club (12+ large-scale events)."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
