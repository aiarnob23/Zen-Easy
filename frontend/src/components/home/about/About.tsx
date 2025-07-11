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
            <h3>Shift your home , Find pickup, support & experienced labors</h3>
            <p>
              Moving to a new place? Connect with verified and reliable home
              moving professionals who handle everything from packing to
              transportation. Enjoy a stress-free relocation experience with Zen
              Easy.
            </p>
          </div>
          <div className="single-about-content">
            <h3>Find Your Dream Home, Effortlessly</h3>
            <p>
              Browse a wide selection of rental properties including bachelor rooms, family flats, and commercial spaces. Our platform makes finding your next home or business location simple and convenient.
            </p>
          </div>
          <div className="single-about-content">
            <h3>Sparkling Clean, Every Time</h3>
            <p>
             Book trusted and efficient home maid services for a spotless living space. Whether it's daily cleaning or deep cleaning, our professionals ensure your home is pristine, giving you more time for what matters.
            </p>
          </div>
          <div className="single-about-content">
            <h3>Shift your home , Find experienced movers</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              consequatur ab totam aspernatur a facilis sequi inventore dolores,
              veniam hic sed vitae perferendis quae. Quam illo, minus asperiores
              inventore corrupti quod molestiae harum natus ipsam voluptatibus
              iste, fugit, nam vitae?
            </p>
          </div>
          <div className="single-about-content">
            <h3>Achieve Academic Excellence with Expert Tutors</h3>
            <p>
              Find qualified tutors for various subjects and academic levels. Get personalized one-on-one guidance to improve your grades, master new skills, and achieve your learning goals with our experienced educators.
            </p>
          </div>
          <div className="single-about-content">
            <h3>Expert IT Solutions for Your Daily Life</h3>
            <p>
              Explore a variety of commercial properties including offices, stores, and shopping mall spaces for rent. Find the perfect location to expand your business with high visibility and strategic advantages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
