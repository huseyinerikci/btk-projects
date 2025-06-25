import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/errors/ErrorPage";
import ServerError from "./pages/errors/ServerError";
import NotFound from "./pages/errors/NotFound";
import { useEffect } from "react";
import requests from "./api/apiClient";
import { useDispatch } from "react-redux";
import { setCart } from "./redux/slices/cartSlice";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductDetailPage /> },
        ],
      },
      { path: "cart", element: <CartPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerError /> },
          { path: "not-found", element: <NotFound /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    requests.cart
      .get()
      .then((cart) => dispatch(setCart(cart)))
      .catch((error) => console.log(error));
  }, []);
  return <RouterProvider router={router} />;
};

export default App;
