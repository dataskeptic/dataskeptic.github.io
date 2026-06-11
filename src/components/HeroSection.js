import React, { useEffect, useRef, useState } from "react";
import "../scss/HeroSection.scss";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);
  const titleRef = useRef(null);
  const contactBoxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Progress: 0 = top of section visible, 1 = section fully scrolled past
      const totalScrollDistance = section.offsetHeight - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / Math.max(totalScrollDistance, 1), 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const leftArm = leftArmRef.current;
    const rightArm = rightArmRef.current;
    const title = titleRef.current;
    const contactBox = contactBoxRef.current;
    if (!leftArm || !rightArm || !title || !contactBox) return;

    // Phase 1 (0 → 0.5): arms separate from Group1 center to Group2 spread
    // Phase 2 (0.5 → 1): contact box fades in, title fades out
    const p = scrollProgress;

    // Left arm: Group1 pos → Group2 pos
    // Group1: left arm fingertip near center (translateX: 0, translateY: 0)
    // Group2: left arm pulled far left-bottom (translateX: -18vw, translateY: 12vh)
    const leftX = p * -18;
    const leftY = p * 12;

    // Right arm: Group1 pos → Group2 pos  
    // Group2: right arm pulled far right-top (translateX: 18vw, translateY: -12vh)
    const rightX = p * 18;
    const rightY = p * -12;

    leftArm.style.transform = `translateX(${leftX}vw) translateY(${leftY}vh)`;
    rightArm.style.transform = `translateX(${rightX}vw) translateY(${rightY}vh)`;

    // Title fades out after 30% scroll
    const titleOpacity = Math.max(0, 1 - p * 3);
    title.style.opacity = titleOpacity;
    title.style.pointerEvents = titleOpacity < 0.1 ? "none" : "auto";

    // Contact box fades in after 50% scroll
    const contactOpacity = Math.max(0, (p - 0.5) * 2);
    const contactScale = 0.85 + contactOpacity * 0.15;
    contactBox.style.opacity = contactOpacity;
    contactBox.style.transform = `translateX(-50%) scale(${contactScale})`;
    contactBox.style.pointerEvents = contactOpacity > 0.1 ? "auto" : "none";
  }, [scrollProgress]);

  return (
    <div className="hero-wrapper" ref={sectionRef}>
      <div className="hero-sticky">
        {/* Background */}
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
          }}
        />

        {/* Left Arm (Adam) */}
        <div className="arm arm-left" ref={leftArmRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/hand-left.png`}
            alt="Adam's hand"
            draggable={false}
          />
        </div>

        {/* Right Arm (God) */}
        <div className="arm arm-right" ref={rightArmRef}>
          <img
            src={`${process.env.PUBLIC_URL}/images/hand-right.png`}
            alt="God's hand"
            draggable={false}
          />
        </div>

        {/* Hero Title */}
        <div className="hero-title" ref={titleRef}>
          <span className="hero-title__text">CREATION BEGINS IN CONTACT</span>
        </div>

        {/* Contact Box */}
        <div className="contact-box" ref={contactBoxRef}>
          <p className="contact-box__label">Let's connect</p>
          <div className="contact-box__icons">
            <a
              href="https://github.com/analyticalcompetitor"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="contact-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.031 1.531 1.031.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/mathenrique"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="contact-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="mailto:mathenrique@email.com"
              aria-label="Email"
              className="contact-icon"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
