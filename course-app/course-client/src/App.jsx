import { createBrowserRouter, RouterProvider } from "react-router";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage, {
  courseDeleteAction,
  coursesLoader,
} from "./pages/course/Courses";
import MainLayout from "./layouts/MainLayout";
import HelpLayout from "./layouts/HelpLayout";
import ContactPage from "./pages/help/Contact";
import FaqPage from "./pages/help/Faq";
import CourseDetailPage, {
  courseDetailsLoader,
} from "./pages/course/CourseDetail";
import CourseLayout from "./layouts/CourseLayout";
import CourseCreatePage from "./pages/course/CourseCreate";
import CourseEditPage from "./pages/course/CourseEdit";
import { courseAction } from "./pages/course/CourseForm";
import NotFoundPage from "./pages/error/NotFoundPage";
import ErrorPage from "./pages/error/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "courses",
        element: <CourseLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <CoursesPage />, loader: coursesLoader },
        ],
      },
      {
        path: "courses/create",
        element: <CourseCreatePage />,
        action: courseAction,
        errorElement: <ErrorPage />,
      },

      // Kurs detay, düzenleme ve silme (layout yok)
      {
        path: "courses/:courseid",
        loader: courseDetailsLoader,
        id: "course-details",
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <CourseDetailPage />,
          },
          {
            path: "edit",
            element: <CourseEditPage />,
            action: courseAction,
          },
          {
            path: "delete",
            action: courseDeleteAction,
          },
        ],
      },
      {
        path: "help",
        element: <HelpLayout />,
        children: [
          { path: "contact", element: <ContactPage /> },
          { path: "faq", element: <FaqPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
