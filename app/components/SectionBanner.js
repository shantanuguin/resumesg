'use client';

import { useScrollReveal } from '../lib/animations';
import styles from './SectionBanner.module.css';

export default function SectionBanner({ title, number }) {
  const ref = useScrollReveal();

  return (
    <div className={styles.banner} ref={ref}>
      <div className={styles.inner}>
        <span className={`${styles.number} mono`}>{number}</span>
        <div className={styles.line} />
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.line} />
      </div>
    </div>
  );
}
