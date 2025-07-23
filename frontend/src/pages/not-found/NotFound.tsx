import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="go-home-div">
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
