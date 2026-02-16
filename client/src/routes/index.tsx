import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import RegisterPages from "../pages/RegisterPages";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";
import ProtectedRoute from "../layouts/ProtectedRoute";
import PublicOnnly from "../layouts/PublicOnnly";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    children: [
      {path: 'contact' , element: <h1>Contact page</h1>},
      {
        Component: PublicOnnly,//เช็คสถานะก่อนคนที่ login แล้ว
        children: [
          { path: "register", Component: RegisterPages },
          { path: "login", Component: LoginPage },
        ],
      },
      {
        Component: ProtectedRoute, //ต้องผ่านด่านรี้ก่อนในการคัดกรองคนที่ยังไม่ login
        children: [
          { index: true, Component: HomePage },
          { path: "/profile", Component: ProfilePage },
        ],
      },
    ],
  },
]);
