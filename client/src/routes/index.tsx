import { createBrowserRouter } from "react-router";
import MainLayouts from "../layouts/MainLayouts";
import RegisterPages from "../pages/RegisterPages";
import LoginPage from "../pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayouts,
    children: [
      {path: 'register', Component: RegisterPages},
      {path: 'login' , Component: LoginPage}
    ]
  }
])