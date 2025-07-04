import { Link } from "react-router-dom";
import "./header.scss";
import { FaUser } from 'react-icons/fa';

const Header = ({bg} : {bg:string}) => {
    console.log('header rendered');

    const navLinks = [
        { name: "Rent", path: "/main/rent" },
        { name: "Maid", path: "/main/home-maid" },
        { name: "Plumber", path: "/main/plumber" },
        { name: "Tutor", path: "/main/tutor" },
        { name: "Electrician", path: "/main/electrician" },
        { name: "IT Consultant", path: "/main/it-consultant" },
        { name: "Painter", path: "/main/painter" },
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
               <Link to='/main/profile' className="user-profile"><FaUser/></Link>
           </ul>
        </nav>
    </div>
  );
};

export default Header;