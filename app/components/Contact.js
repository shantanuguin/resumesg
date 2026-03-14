'use client';

import { useScrollReveal, useStaggerReveal } from '../lib/animations';
import { Mail, Linkedin, MapPin } from 'lucide-react';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className={`section ${styles.contact}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <div ref={useScrollReveal()}>
            <p className="eyebrow" style={{ textAlign: 'center', marginBottom: '1rem' }}>
              Get in Touch
            </p>
            <h2 className={`display-heading ${styles.heading}`}>
              Let&apos;s Work<br />
              <span className={styles.headingAccent}>Together</span>
            </h2>
            <p className={styles.description}>
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of an innovative vision.
            </p>
          </div>
          <div className={styles.info} ref={useStaggerReveal()}>
            <a href="mailto:shantanu.guin281203@gmail.com" className={`${styles.infoItem} underline-link`}>
              <Mail size={20} />
              shantanu.guin281203@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/shantanuguin/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.infoItem} underline-link`}
            >
              <Linkedin size={20} />
              linkedin.com/in/shantanuguin
            </a>
            <div className={styles.infoItem}>
              <MapPin size={20} />
              New Delhi, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
