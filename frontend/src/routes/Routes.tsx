import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import OfferService from "../pages/offer-service/OfferService";
import AboutUs from "../pages/about-us/AboutUs";
import RentPage from "../pages/rent/Rent";
import GeneralProfile from "../pages/general-profile/GeneralProfile";
import AddRent from "../pages/add-rent/AddRent";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/auth/register/Register";
import Login from "../pages/auth/login/Login";
import OTPValidate from "../pages/auth/otp-validate/OTPValidate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/main",
    element: <RootLayout />,
    children: [
      {
        path: "/main/offer-service",
        element: <OfferService />,
      },
      {
        path: "/main/about-us",
        element: <AboutUs />,
      },
      {
        path: "/main/rent",
        element: <RentPage />,
      },
      {
        path: "/main/profile",
        element: <GeneralProfile />,
      },
      {
        path: "/main/add-rent",
        element: <AddRent />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/otp-validate/:id",
        element: <OTPValidate />,
      },
    ],
  },
]);

export default router;
