import { useEffect, useRef, useState } from "react";
import {
  FaHome,
  FaRestroom,
  FaTools,
  FaChalkboardTeacher,
  FaBolt,
  FaLaptop,
  FaPaintBrush,
} from "react-icons/fa";
import "./Service.scss";

const Service = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  const serviceList = [
    { id: 1, name: "Home / Room Rent", icon: <FaHome /> },
    { id: 2, name: "Home Maid", icon: <FaRestroom /> },
    { id: 3, name: "Plumber", icon: <FaTools /> },
    { id: 4, name: "Home Tutor", icon: <FaChalkboardTeacher /> },
    { id: 5, name: "Electrician", icon: <FaBolt /> },
    { id: 6, name: "IT Consultant", icon: <FaLaptop /> },
    { id: 7, name: "Painting", icon: <FaPaintBrush /> },
  ];

  // trigger use
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
    };
  }, []);

  return (
    <div className="service-container" ref={containerRef}>
      <div className="service-header">
        <h3>Find what you need in person.</h3>
      </div>
      <div className="service-list">
        <ul>
          {serviceList.map((service, index) => (
            <li
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
