
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to the College Course Registration Portal</h1>

      <p>
        Explore available courses and register for your preferred
        course easily through our online portal.
      </p>

      <div className="home-buttons">
        <Link to="/courses" className="btn">
          View Courses
        </Link>

        <Link to="/register" className="btn">
          Register Now
        </Link>
      </div>
    </div>
  );
}

export default Home;
