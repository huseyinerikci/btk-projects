import { useRouteLoaderData } from "react-router";
import CourseForm from "./CourseForm";

const CourseEditPage = () => {
  const course = useRouteLoaderData("course-details");
  return <CourseForm method="PUT" data={course} />;
};

export default CourseEditPage;
