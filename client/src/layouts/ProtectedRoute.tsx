import { useAuthStore } from "../store/useAuthStore"
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log(isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login"/>
  }
  
  return <Outlet/>
}
export default ProtectedRoute