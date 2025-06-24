import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" theme="colored" />
      <Navbar />
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </div>
  );
};

export default MainLayout;
