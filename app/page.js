import Hero from './components/Hero';
import SectionBanner from './components/SectionBanner';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <SectionBanner title="About" number="01" />
      <About />
      <SectionBanner title="Experience & Education" number="02" />
      <Experience />
      <SectionBanner title="Projects & Research" number="03" />
      <Projects />
      <SectionBanner title="Skills & Expertise" number="04" />
      <Skills />
      <SectionBanner title="Certifications" number="05" />
      <Certifications />
      <SectionBanner title="Contact" number="06" />
      <Contact />
    </>
  );
}
