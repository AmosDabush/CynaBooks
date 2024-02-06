import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css"; // Assuming you'll create a specific CSS file for styling
import notFoundImage from "../../assets/404.webp";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>Oops!</h1>
        <h2>404 - Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button onClick={handleGoHome} className="home-button">
          Take Me Home
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
