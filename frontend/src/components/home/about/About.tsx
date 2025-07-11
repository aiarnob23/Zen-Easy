import { useEffect, useRef } from "react";
import "./About.scss";

const About = () => {
  const aboutContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (aboutContentsRef.current) {
      const singleAboutContents = aboutContentsRef.current.querySelectorAll(
        ".single-about-content"
      );
      singleAboutContents.forEach((element: any) => {
        observer.observe(element);
      });
    }

    return () => {
      if (aboutContentsRef.current) {
        const singleAboutContents = aboutContentsRef.current.querySelectorAll(
          ".single-about-content"
        );
        singleAboutContents.forEach((element: any) => {
          observer.unobserve(element);
        });
      }
      observer.disconnect();
    };
  });
  return (
    <div className="about-container-bg">
      <div className="about-container">
        <div className="about-contents" ref={aboutContentsRef}>
          <div className="single-about-content">
            <h3>Shift your home, Find pickup, support & experienced labors</h3>
            <p>
              Moving to a new place? Connect with verified and reliable home
              moving professionals who handle everything from packing to
              transportation. Enjoy a stress-free relocation experience with Zen
              Easy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;