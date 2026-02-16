import { NavLink } from "react-router";
import { useAuthStore } from "../store/useAuthStore";
import { axios } from "../config/axios";

const Header = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((stete) => stete.clearAuth)

  const handleClickLogout = async () => {//logout
    await axios.post('/auth/logout');
    clearAuth();
  };
  return (
    <header className="flex justify-between items-center bg-linear-to-r from-blue-400 to-sky-200 px-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Logo</h1>
      </div>
      <div className="flex gap-5 font-bold text-w">
        {isAuthenticated ? (
          <>
            <NavLink to="/">Home</NavLink>
            <button onClick={handleClickLogout}>LogOut</button>
            <NavLink to="/profile">Profile</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </header>
  );
};
export default Header;
