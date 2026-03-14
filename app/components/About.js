'use client';

import { useAboutReveal } from '../lib/animations';
import styles from './About.module.css';

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
            <div className={styles.detailCard}>
              <p className="eyebrow">Manufacturing Excellence</p>
              <p className={styles.detailText}>
                Industrial Engineering, Line Balancing, Time Study, and Production Optimization
                in high-volume export environments.
              </p>
            </div>
            <div className={styles.detailCard}>
              <p className="eyebrow">Digitalization &amp; Automation</p>
              <p className={styles.detailText}>
                PowerBI, Advanced Excel, VBA, Workflow Digitization, AGV Prototyping,
                and developing Progressive Web Apps (PWAs).
              </p>
            </div>
            <div className={styles.detailCard}>
              <p className="eyebrow">Leadership</p>
              <p className={styles.detailText}>
                Student Head, NIFT Central Placement Coordination (120+ member team)
                &amp; President, Social Club (12+ large-scale events).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
