import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ErrorPage from "./pages/errors/ErrorPage";
import ServerError from "./pages/errors/ServerError";
import NotFound from "./pages/errors/NotFound";
import Loading from "./components/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./redux/slices/cartSlice";
import { getUser } from "./redux/slices/accountSlice";
import MainLayout from "./layouts/MainLayout";
import AuthGuard from "./auth/AuthGuard";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

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
        element: <AuthGuard />,
        children: [
          { path: "checkout", element: <CheckoutPage /> },
          { path: "orders", element: <OrdersPage /> },
        ],
      },

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
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.account);

  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCart());
  };

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, []);

  // Handle navigation after login/logout
  useEffect(() => {
    if (user) {
      // User is logged in, navigate to home if on login/register page
      const currentPath = window.location.pathname;
      if (currentPath === "/login" || currentPath === "/register") {
        router.navigate("/");
      }
    } else {
      // User is logged out, navigate to login if not on login/register page
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        router.navigate("/login");
      }
    }
  }, [user]);

  if (loading) return <Loading message="Uygulama Başlatılıyor" />;
  return <RouterProvider router={router} />;
};

export default App;
