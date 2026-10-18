
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=6"
        );

        if (!response.ok) {
          throw new Error("Failed to load courses.");
        }

        const data = await response.json();

        const courseData = data.map((item, index) => ({
          id: item.id,
          name: [
            "Web Development",
            "Database Management",
            "Java Programming",
            "Computer Networks",
            "Software Engineering",
            "Artificial Intelligence",
          ][index],
          code: `CS${101 + index}`,
          credits: index % 2 === 0 ? 4 : 3,
        }));

        setCourses(courseData);
      } catch (err) {
        setError("Unable to load courses. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="status-message">Loading courses...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="page-container">
      <h1>Available Courses</h1>
      <p>Choose a course and register today.</p>

      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Courses;
