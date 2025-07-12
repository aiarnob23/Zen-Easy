import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaRestroom,
  FaTools,
  FaChalkboardTeacher,
  FaBolt,
  FaLaptop,
  FaPaintBrush,
  FaTruck,
} from "react-icons/fa";
import "./Service.scss";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [isVisible, setIsVisible] = useState(false); 
  const [isHeadingVisible, setIsHeadingVisible] = useState(false); 
  const containerRef = useRef(null);
  const headingRef = useRef(null); 
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    navigate(`/main/${link}`);
  };
  const serviceList = [
    { id: 1, link:'rent', name: "Home / Room Rent", icon: <FaHome /> },
    { id: 2, link:'find-service/Maid', name: "Home Maid", icon: <FaRestroom /> },
     { id: 2, link:'find-service/Home Shifter', name: "Home Shifter", icon: <FaTruck /> }, 
    { id: 3, link:'find-service/Plumber', name: "Plumber", icon: <FaTools /> },
    { id: 4, link:'find-service/Tutor', name: "Home Tutor", icon: <FaChalkboardTeacher /> },
    { id: 5, link:'find-service/Electrician', name: "Electrician", icon: <FaBolt /> },
    { id: 6, link:'find-service/IT Provider', name: "IT Provider", icon: <FaLaptop /> },
    { id: 7, link:'find-service/Painter', name: "Painter", icon: <FaPaintBrush /> },
  ];

  // trigger use (for service cards)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect(); 
    };
  }, []);

  // ------- heading animation
  useEffect(() => {
    const headingObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeadingVisible(true);
          headingObserver.unobserve(entry.target);
        }
      },
      {
        threshold: 0.5, 
        rootMargin: "0px",
      }
    );

    if (headingRef.current) {
      headingObserver.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        headingObserver.unobserve(headingRef.current);
      }
      headingObserver.disconnect(); 
    };
  }, []);


  return (
    <div className="service-container" ref={containerRef}>
      <div className={`service-header ${isHeadingVisible ? 'animate-heading' : ''}`} ref={headingRef}>
        <h3>Find what you need in person.</h3>
      </div>
      <div className="service-list">
        <ul>
          {serviceList.map((service, index) => (
            <li
              onClick={() => handleServiceClick(service.link)}
              className={`flex flex-col-reverse service-card ${
                isVisible ? "animate" : ""
              }`}
              key={service.id}
              style={{ animationDelay: isVisible ? `${index * 0.15}s` : "0s" }}
            >
              {service.icon}
              <span className="service-name">{service.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Service;