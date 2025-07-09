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
import RentDetailsPage from "../pages/rent-details/RentDetails";
import FindService from "../pages/find-service/FindService";
import ProfProfile from "../pages/prof-profile/profProfile";
import PrivateRoute from "./PrivateRoutes";
import EditProfile from "../pages/edit-profile/EditProfile";

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
    element: <PrivateRoute><RootLayout /></PrivateRoute>,
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
        path: "/main/profile/:userId",
        element: <GeneralProfile />,
      },
      {
        path: "/main/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/main/add-rent",
        element: <AddRent />,
      },
      {
        path: "/main/view-rent/:id",
        element: <RentDetailsPage />,
      },
      {
        path: "/main/find-service/:category",
        element: <FindService />,
      },
      {
        path: "/main/prof-profile/:id",
        element: <ProfProfile />,
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
