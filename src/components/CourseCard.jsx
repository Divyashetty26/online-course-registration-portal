
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>

      <p>
        <strong>Course Code:</strong> {course.code}
      </p>

      <p>
        <strong>Credits:</strong> {course.credits}
      </p>

      <Link
        to={`/register?course=${encodeURIComponent(course.code)}`}
        className="btn"
      >
        Register
      </Link>
    </div>
  );
}

export default CourseCard;
