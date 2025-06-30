import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";
import RootLayout from "../layouts/RootLayout";
import OfferService from "../pages/offer-service/OfferService";


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
        }
    ]
   }

]);

export default router;