import { Link } from "react-router-dom";
import "./header.scss";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import { useState } from "react";

const Header = ({ bg }: { bg: string }) => {
  console.log("header rendered");
  const selfId = Cookies.get("zenEasySelfId");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: "Rent", path: "/main/rent" },
    { name: "Maid", path: "/main/find-service/Maid" },
    { name: "Home Shifter", path: "/main/find-service/Home Shifter" },
    { name: "Plumber", path: "/main/find-service/Plumber" },
    { name: "Tutor", path: "/main/find-service/Tutor" },
    { name: "Electrician", path: "/main/find-service/Electrician" },
    { name: "IT Provider", path: "/main/find-service/IT Provider" },
    { name: "Painter", path: "/main/find-service/Painter" },
  ];
  return (
    <div className={`${bg === "white" ? "bg-white" : "bg-black"} header`}>
      {/* ------------desktop -------------*/}
      <nav className="navs">
        {/* logo */}
        <Link to="/" id="logo">
          ZenEasy
        </Link>
        {/* menu */}
        <ul className="flex items-center space-x-[24px] justify-between ">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          <Link to={`/main/profile/${selfId}`} className="user-profile">
            <FaUser />
          </Link>
        </ul>
      </nav>

      {/* ------------moobile -------------*/}
      <nav className="mobile-navs">
        <div className="mobile-header-top">
          {/* logo */}
          <Link to="/" id="logo">
            ZenEasy
          </Link>
          {/* Hamburger icon */}
          <div className="mobile-hamburger-icon" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        {/* menu */}
        <ul
          className={`mobile-menu ${
            isMobileMenuOpen ? "mobile-menu-open" : "mobile-menu-close"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} onClick={toggleMobileMenu}>
                {link.name}
              </Link>
            </li>
          ))}
          <Link
            to={`/main/profile/${selfId}`}
            className="user-profile"
            onClick={toggleMobileMenu}
          >
            <FaUser />
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
