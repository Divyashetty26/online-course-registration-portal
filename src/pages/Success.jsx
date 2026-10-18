
import { Link, useLocation } from "react-router-dom";

function Success() {
  const location = useLocation();

  const student = location.state?.student;
  const courseName = location.state?.courseName;

  if (!student) {
    return (
      <div className="page-container success-page">
        <h1>No Registration Details Found</h1>
        <p>Please register for a course first.</p>
        <Link to="/register" className="btn">
          Go to Registration
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container success-page">
      <div className="success-icon">✓</div>

      <h1>Registration Successful!</h1>

      <p>
        Congratulations, {student.name}! Your course registration
        was submitted successfully.
      </p>

      <div className="registration-details">
        <h2>Registration Details</h2>

        <p>
          <strong>Student Name:</strong> {student.name}
        </p>

        <p>
          <strong>Roll Number:</strong> {student.rollNumber}
        </p>

        <p>
          <strong>Selected Course:</strong> {courseName}
        </p>

        <p>
          <strong>Course Code:</strong> {student.course}
        </p>
      </div>

      <Link to="/courses" className="btn">
        Explore More Courses
      </Link>
    </div>
  );
}

export default Success;
