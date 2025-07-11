import React, { useState, useEffect, useRef } from 'react';
import './OurProperty.scss';
import { Link } from 'react-router-dom';

const OurProperty: React.FC = () => {
    const section2Ref = useRef<HTMLDivElement>(null);
    const section3Ref = useRef<HTMLDivElement>(null);
    const section4Ref = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLDivElement>(null); 
    const [isHeadingVisible, setIsHeadingVisible] = useState(false);

    // -------------handle scroll---------------------
    useEffect(() => {
        const handleScroll = () => {
            if (section2Ref.current) {
                const rect = section2Ref.current.getBoundingClientRect();
                const speed = rect.top * 0.3;
                section2Ref.current.style.transform = `translateY(${speed}px)`;
            }
            
            if (section3Ref.current) {
                const rect = section3Ref.current.getBoundingClientRect();
                const speed = rect.top * 0.2;
                section3Ref.current.style.transform = `translateY(${speed}px)`;
            }
            
            if (section4Ref.current) {
                const rect = section4Ref.current.getBoundingClientRect();
                const speed = rect.top * 0.3;
                section4Ref.current.style.transform = `translateY(${speed}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    //-----------heading trigger--------
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
        <div className="property-collection">
            <div className="header" ref={headingRef}> 
                <h1 className={isHeadingVisible ? 'animate-heading' : ""}>Explore Our Property Collection</h1> {/* Apply class to h1 */}
            </div>
            
            {/* Section 2 */}
            <div className="property-section">
                <div className="parallax-container" ref={section2Ref}>
                    <img 
                        src="https://images.unsplash.com/photo-1630597603185-7f5af3bf04c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                        alt="Dream Property" 
                        className="parallax-image"
                    />
                </div>
                <Link to='/main/rent' className="property-content">
                    <h2>Discover Your Dream Property</h2>
                    <p>Find the perfect home that matches your lifestyle</p>
                </Link>
            </div>

            {/* Section 3 */}
            <div className="property-section">
                <div className="parallax-container" ref={section3Ref}>
                    <img 
                        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" 
                        alt="Luxury Homes" 
                        className="parallax-image"
                    />
                </div>
                <Link to='/main/rent' className="property-content">
                    <h2>Luxury Homes, Smart Investments</h2>
                    <p>Premium properties with excellent ROI potential</p>
                </Link>
            </div>

            {/* Section 4 */}
            <div className="property-section">
                <div className="parallax-container" ref={section4Ref}>
                    <img 
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80" 
                        alt="Premium Properties" 
                        className="parallax-image"
                    />
                </div>
                <Link to='/main/rent' className="property-content">
                    <h2>Premium Properties, Prime Locations</h2>
                    <p>Exclusive real estate in the most desirable areas</p>
                </Link>
            </div>
        </div>
    );
};

export default OurProperty;