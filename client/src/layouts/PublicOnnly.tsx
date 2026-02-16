import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/useAuthStore";

const PublicOnnly = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    if (isAuthenticated){
      return <Navigate to='/'/>
    }
  return <Outlet/>
}
export default PublicOnnly