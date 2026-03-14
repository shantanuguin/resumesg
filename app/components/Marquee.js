'use client';

import styles from './Marquee.module.css';

export default function Marquee() {
  const items = [
    'Line Balancing & TimeSSD',
    'Factory Digitalization',
    'PowerBI & Data Viz',
    'Workflow Digitization',
    'Industrial Engineering',
    'AGV & IoT Sensors',
    'AutoCAD & CLO3D',
    'Python & React Dev',
  ];

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {/* Triple the items to ensure continuous flow */}
        {[...items, ...items, ...items].map((item, i) => (
          <div key={i} className={styles.item}>
            <span className={styles.dot}>•</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
