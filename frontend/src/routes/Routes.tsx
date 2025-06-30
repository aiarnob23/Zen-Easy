import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/home/Home";


const router = createBrowserRouter([
   {
    path:"/",
    element:<HomeLayout/>,
    children:[
        {
            path:"/",
            element:<Home/>
        },
    ]
   },

]);

export default router;