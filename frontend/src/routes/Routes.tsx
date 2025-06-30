import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import OfferService from "../pages/offer-service/OfferService";
import AboutUs from "../pages/about-us/AboutUs";
import RentPage from "../pages/rent/Rent";

const router = createBrowserRouter([
   {
    path:"/",
    element:<HomeLayout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
    ],
   },
   {
    path:"/main",
    element:<RootLayout/>,
    children:[
        {
            path:"/main/offer-service",
            element:<OfferService/>
        },
        {
            path:"/main/about-us",
            element:<AboutUs/>
        },
        {
            path:"/main/rent",
            element:<RentPage/>
        },

    ]
   }

]);

export default router;