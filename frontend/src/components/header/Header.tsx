import { Link } from "react-router-dom";
import "./header.scss";
import { FaUser } from 'react-icons/fa';
import Cookies from "js-cookie";

const Header = ({bg} : {bg:string}) => {
    console.log('header rendered');
    const selfId = Cookies.get("zenEasySelfId");

    const navLinks = [
        { name: "Rent", path: "/main/rent" },
        { name: "Maid", path: "/main/find-service/Maid" },
        { name: "Plumber", path: "/main/find-service/Plumber" },
        { name: "Tutor", path: "/main/find-service/Tutor" },
        { name: "Electrician", path: "/main/find-service/Electrician" },
        { name: "IT Consultant", path: "/main/find-service/IT Consultant" },
        { name: "Painter", path: "/main/find-service/Painter" },
    ]
  return (
    <div className={`${bg==="white" ? "bg-white" : "bg-black"} header`}>
        {/* desktop */}
        <nav className="navs">
           {/* logo */}
           <Link to="/" id="logo">ZenEasy</Link>
           {/* menu */}
           <ul className="flex items-center space-x-[24px] justify-between ">
               {navLinks.map(link => (
                   <li key={link.name}>
                       <Link to={link.path}>{link.name}</Link>
                   </li>
               ))}
               <Link to={`/main/profile/${selfId}`} className="user-profile"><FaUser/></Link>
           </ul>
        </nav>
    </div>
  );
};

export default Header;