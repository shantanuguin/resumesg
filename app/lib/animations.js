'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: Animate element from bottom with fade in when scrolling into view
 */
export function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Ensure hidden state immediately
      gsap.set(el, { y: 60, opacity: 0 });

      gsap.to(el, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Hook: animate counter from 0 to target using GSAP
 */
export function useCounter(target, duration = 1.5) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        onUpdate: () => {
          if (el) el.textContent = Math.ceil(obj.val) + '%';
        },
      });
    }, el);

    return () => ctx.revert();
  }, [target, duration]);

  return ref;
}

/**
 * Hook: stagger children reveal
 */
export function useStaggerReveal(delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !container.children.length) return;

    const ctx = gsap.context(() => {
      const children = Array.from(container.children);
      
      gsap.set(children, { y: 30, opacity: 0 });

      gsap.to(children, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: delay,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [delay]);

  return ref;
}

/**
 * Hook: Subtle parallax effect tracking mouse or scroll
 */
export function useParallax(speed = 0.05) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const y = window.scrollY * speed;
      gsap.to(el, { y, ease: 'none', duration: 0 });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
}

/**
 * Hook: Magnetic hover effect for buttons/cards
 */
export function useMagnetic() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Move element slightly towards cursor
      xTo(x * 0.3);
      yTo(y * 0.3);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return ref;
}

/**
 * Hook: Text scramble effect — random characters → real text.
 * Triggered once when the element scrolls into view.
 */
export function useTextScramble(text) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let frame = 0;
    let rafId;
    let triggered = false;

    // To prevent shaking: 
    // 1. Measure the element with the REAL text first to get its final size
    const measureSize = () => {
      const originalText = el.textContent;
      el.textContent = text;
      const { width, height } = el.getBoundingClientRect();
      el.style.minWidth = `${width}px`;
      el.style.minHeight = `${height}px`;
      el.textContent = originalText;
    };

    const scramble = () => {
      const len = text.length;
      const revealCount = frame * 1.5; 
      let output = '';

      for (let i = 0; i < len; i++) {
        if (text[i] === ' ') {
          output += ' ';
        } else if (i < revealCount) {
          output += text[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      el.textContent = output;
      frame++;

      if (revealCount < len) {
        rafId = requestAnimationFrame(scramble);
      } else {
        el.textContent = text;
        // Optional: clear fixed sizes after animation? 
        // Better to keep them if resizing isn't an issue to avoid another jump.
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 95%',
        once: true,
        onEnter: () => {
          if (!triggered) {
            measureSize(); // Stabilize dimensions before starting
            triggered = true;
            scramble();
          }
        },
      });
    }, el);

    return () => {
      ctx.revert();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [text]);

  return ref;
}

/**
 * Hook: Pinned About section reveal.
 *
 * Pins `wrapperRef` and drives a two-phase timeline:
 *   Phase 1 – Fast word-by-word text unblur on `textRef`
 *   Phase 2 – Cards stagger-unblur on `cardsRef` children
 *
 * @param {object} opts
 * @param {number} opts.initialOpacity  - Starting word opacity. Default 0.12
 * @param {number} opts.blurAmount      - Max blur px. Default 5
 */
export function useAboutReveal({
  initialOpacity = 0.12,
  blurAmount = 5,
} = {}) {
  const wrapperRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const textEl = textRef.current;
    const cardsEl = cardsRef.current;
    if (!wrapper || !textEl || !cardsEl) return;

    // On mobile, skip pinning and use simple fade-in instead
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const ctx = gsap.context(() => {
        gsap.from(textEl, {
          opacity: 0, y: 30, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: textEl, start: 'top 85%', once: true },
        });
        const cards = Array.from(cardsEl.children);
        gsap.from(cards, {
          opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: cardsEl, start: 'top 85%', once: true },
        });
      }, wrapper);
      return () => ctx.revert();
    }

    // ---- 1. Wrap every word in the text element ----
    const walker = document.createTreeWalker(textEl, NodeFilter.SHOW_TEXT, null);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const text = node.textContent;
      if (!text || !text.trim()) return;
      const frag = document.createDocumentFragment();
      const parts = text.split(/(\s+)/);
      parts.forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
        } else if (part) {
          const span = document.createElement('span');
          span.className = 'unblur-word';
          span.textContent = part;
          span.style.display = 'inline';
          span.style.opacity = String(initialOpacity);
          span.style.filter = `blur(${blurAmount}px)`;
          span.style.willChange = 'filter, opacity';
          frag.appendChild(span);
        }
      });
      node.parentNode.replaceChild(frag, node);
    });

    const words = textEl.querySelectorAll('.unblur-word');
    const cards = Array.from(cardsEl.children);

    // ---- 2. Set initial state for cards ----
    gsap.set(cards, {
      opacity: 0,
      filter: `blur(${blurAmount}px)`,
      y: 30,
    });

    // ---- 3. Build pinned timeline ----
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top+=64',
          end: '+=150%',
          pin: true,
          scrub: 0.4,
          pinSpacing: true,
        },
      });

      // Phase 1 (0 → 0.55): word-by-word text unblur
      const wordCount = words.length;
      words.forEach((word, i) => {
        const pos = (i / wordCount) * 0.55; // spread across 0→0.55
        tl.fromTo(
          word,
          { opacity: initialOpacity, filter: `blur(${blurAmount}px)` },
          { opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 0.3 },
          pos
        );
      });

      // Phase 2 (0.58 → 0.88): cards stagger unblur
      tl.to(cards, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.3,
        stagger: 0.06,
        ease: 'power2.out',
      }, 0.58);

      // Phase 3 (0.88 → 1.0): brief hold — everything stays visible
      tl.to({}, { duration: 0.12 });
    }, wrapper);

    return () => ctx.revert();
  }, [initialOpacity, blurAmount]);

  return { wrapperRef, textRef, cardsRef };
}

/**
 * Hook: Morph a heading from horizontal → vertical sticky left.
 *
 * Desktop: The horizontal heading scrolls normally. When it exits the 
 * viewport, it fades out and a vertical side-label fades in, sticking
 * to the left of the section until the section ends.
 *
 * Mobile: No morphing at all — just a normal heading.
 */
export function useHeadingMorph() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null); // the vertical side label
  const horizontalRef = useRef(null); // the horizontal heading

  useEffect(() => {
    const section = sectionRef.current;
    const vertical = headingRef.current;
    const horizontal = horizontalRef.current;
    if (!section || !vertical || !horizontal) return;

    // No morphing on mobile
    if (window.innerWidth <= 768) return;

    const ctx = gsap.context(() => {
      // Morph happens earlier: as horizontal heading approaches the nav bar.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontal,
          start: 'top top+=120', // Start morphing when heading is 120px from top
          end: 'bottom top+=40', // Finish morphing earlier
          scrub: true, // Tie animation directly to scroll position
        }
      });

      // Fade horizontal out
      tl.to(horizontal, { opacity: 0, y: -10, ease: 'none' }, 0);
      // Fade vertical in
      tl.fromTo(vertical, { opacity: 0 }, { opacity: 1, ease: 'none' }, 0);
      
    }, section);

    return () => ctx.revert();
  }, []);

  return { sectionRef, headingRef, horizontalRef };
}
