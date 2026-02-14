import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-linear-to-r from-blue-400 to-sky-200 px-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Logo</h1>
      </div>
      <div className="flex gap-5 font-bold text-w">
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </header>
  );
};
export default Header;
