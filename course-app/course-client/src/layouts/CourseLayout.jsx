import { Link, Outlet } from "react-router";

const CourseLayout = () => {
  return (
    <div id="course-layout">
      <h1>Courses</h1>
      <button>
        <Link to={"create"} className="create-btn">
          New Course
        </Link>
      </button>
      <Outlet />
    </div>
  );
};

export default CourseLayout;
