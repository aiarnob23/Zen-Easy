import "./header.scss";

const Header = ({bg} : {bg:string}) => {

    const navLinks = [
        { name: "Rent", path: "/rent" },
        { name: "Maid", path: "/home-maid" },
        { name: "Plumber", path: "/plumber" },
        { name: "Tutor", path: "/tutor" },
        { name: "Electrician", path: "/electrician" },
        { name: "IT Consultant", path: "/it-consultant" },
        { name: "Painter", path: "/painter" },
    ]
  return (
    <div className={`${bg==="white" ? "bg-white" : "bg-black"} header`}>
        {/* desktop */}
        <nav className="navs">
           {/* logo */}
           <div className="logo">ZenEasy</div>
           {/* menu */}
           <ul className="flex items-center space-x-[24px] justify-between ">
               {navLinks.map(link => (
                   <li key={link.name}>
                       <a href={link.path}>{link.name}</a>
                   </li>
               ))}
           </ul>
        </nav>
    </div>
  );
};

export default Header;