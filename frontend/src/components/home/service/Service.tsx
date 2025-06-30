import { FaHome, FaRestroom, FaTools, FaChalkboardTeacher, FaBolt, FaLaptop, FaPaintBrush } from 'react-icons/fa';
import "./Service.scss"

const Service = () => {
  const serviceList = [
    { id: 1, name: 'Home / Room Rent', icon: <FaHome /> },
    { id: 2, name: 'Home Maid', icon: <FaRestroom /> },
    { id: 3, name: 'Plumber', icon: <FaTools /> },
    { id: 4, name: 'Home Tutor', icon: <FaChalkboardTeacher /> },
    { id: 5, name: 'Electrician', icon: <FaBolt /> },
    { id: 6, name: 'IT Consultant', icon: <FaLaptop /> },
    { id: 7, name: 'Painting', icon: <FaPaintBrush /> },
  ];

  return (
    <div className='service-container'>
      <div className='service-header'>
        <h3>Find what you need in person.</h3>
      </div>
      <div className='service-list'>
        <ul >
          {serviceList.map(service => (
            <li className='flex flex-col-reverse' key={service.id}>
              {service.icon}
              <span className='service-name'>{service.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Service;
