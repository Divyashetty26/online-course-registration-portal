
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputField from "../components/InputField";

function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialCourse = searchParams.get("course") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    phone: "",
    course: initialCourse,
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const courseOptions = [
    { code: "CS101", name: "Web Development" },
    { code: "CS102", name: "Database Management" },
    { code: "CS103", name: "Java Programming" },
    { code: "CS104", name: "Computer Networks" },
    { code: "CS105", name: "Software Engineering" },
    { code: "CS106", name: "Artificial Intelligence" },
  ];

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required.";
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setApiError("");

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Registration request failed.");
      }

      const selectedCourse = courseOptions.find(
        (course) => course.code === formData.course
      );

      navigate("/success", {
        state: {
          student: formData,
          courseName: selectedCourse.name,
        },
      });
    } catch (error) {
      setApiError(
        "Registration failed. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container">
      <h1>Student Registration</h1>
      <p>Enter your details to register for a course.</p>

      <form className="registration-form" onSubmit={handleSubmit}>
        <InputField
          label="Student Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter your full name"
        />

        <InputField
          label="Student Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email"
        />

        <InputField
          label="Roll Number"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleChange}
          error={errors.rollNumber}
          placeholder="Enter your roll number"
        />

        <InputField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder="Enter your 10-digit phone number"
        />

        <div className="form-group">
          <label htmlFor="course">Select Course</label>

          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
          >
            <option value="">-- Select a course --</option>

            {courseOptions.map((course) => (
              <option key={course.code} value={course.code}>
                {course.name} ({course.code})
              </option>
            ))}
          </select>

          {errors.course && (
            <p className="error">{errors.course}</p>
          )}
        </div>

        {apiError && <p className="error">{apiError}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Submit Registration"}
        </button>
      </form>
    </div>
  );
}

export default Register;
