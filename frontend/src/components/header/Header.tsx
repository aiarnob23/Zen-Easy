import { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { Menu, X } from "lucide-react";

const Header = ({ bg }: { bg: string }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const selfId = Cookies.get("zenEasySelfId");

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={`${bg === "white" ? "bg-white" : "bg-black"} header`}>
      <nav className="navs">
        <Link to="/" id="logo" onClick={closeMobileMenu}>
          ZenEasy
        </Link>
        {/* desktop */}
        <ul className="nav-menu desktop-menu">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path}>{link.name}</Link>
            </li>
          ))}
          <li>
            <Link to={`/main/profile/${selfId}`} className="user-profile">
              <FaUser />
            </Link>
          </li>
        </ul>

        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* mobile */}
        <ul
          className={`nav-menu mobile-menu ${
            isMobileMenuOpen ? "is-open" : ""
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link to={link.path} onClick={closeMobileMenu}>
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={`/main/profile/${selfId}`}
              className="user-profile-mobile"
              onClick={closeMobileMenu}
            >
              <FaUser />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
