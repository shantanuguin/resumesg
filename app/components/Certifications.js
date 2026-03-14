'use client';

import { useState } from 'react';
import { useScrollReveal, useStaggerReveal } from '../lib/animations';
import { ChevronDown, CheckCircle2 } from 'lucide-react';
import styles from './Certifications.module.css';

const CERTIFICATIONS = [
  {
    title: 'Universal Robots Academy',
    status: 'Completed',
    statusColor: 'green',
    items: [
      'UR20/30 e-Learning',
      'e-Series Core Track',
      'e-Series Pro Track',
      'e-Series Application Track',
    ],
  },
  {
    title: 'Oracle Cloud Infrastructure AI Foundations',
    status: 'Ongoing',
    statusColor: 'amber',
    items: [],
  },
  {
    title: 'SAP S/4HANA',
    status: 'Ongoing Learning Track',
    statusColor: 'amber',
    items: [],
  },
];

function CertCard({ cert, i, isOpen, onToggle }) {
  return (
    <div
      className={`${styles.certCard} card`}
      style={{ transitionDelay: `${i * 0.1}s` }}
    >
      <button
        className={styles.certHeader}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div>
          <h3 className={styles.certTitle}>{cert.title}</h3>
          <p className={styles.certStatus}>
            Status:{' '}
            <span className={styles[`status${cert.statusColor}`]}>
              {cert.status}
            </span>
          </p>
        </div>
        {cert.items.length > 0 && (
          <ChevronDown
            size={20}
            className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          />
        )}
      </button>

      {cert.items.length > 0 && (
        <div
          className={styles.certBody}
          style={{ maxHeight: isOpen ? `${cert.items.length * 50 + 20}px` : '0' }}
        >
          <ul className={styles.certItems}>
            {cert.items.map((item, j) => (
              <li key={j} className={styles.certItem}>
                <CheckCircle2 size={16} fill="var(--accent)" stroke="var(--bg)" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Certifications() {
  const headingRef = useScrollReveal();
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <section id="certifications" className={`section ${styles.certs}`}>
      <div className="container">
        <h2 className={`section-heading ${styles.heading} reveal`} ref={headingRef}>
          Certifications
        </h2>

        <div className={styles.list} ref={useStaggerReveal()}>
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard
              key={i}
              cert={cert}
              i={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
