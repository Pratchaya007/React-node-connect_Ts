import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import RegisterPages from "../pages/RegisterPages";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [
      {path: 'register', Component: RegisterPages},
      {path: 'login' , Component: LoginPage},
      {index: true ,Component: HomePage},
      {path: '/profile' ,Component: ProfilePage}
    ]
  }
])