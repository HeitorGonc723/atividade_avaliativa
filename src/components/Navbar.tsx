import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="
        w-full
        bg-blue-500
        text-gray-100
        text-3xl
        px-8
        py-8
        flex
        justify-center
        gap-9
      "
    >
      <NavLink
        to="/"
        className="hover:text-gray-300 transition"
      >
        Home
      </NavLink>

      <NavLink
        to="/tasks"
        className="hover:text-gray-300 transition"
      >
        TaskMaster
      </NavLink>

      <NavLink
        to="/contacts"
        className="hover:text-gray-300 transition"
      >
        ConnectHub
      </NavLink>

      <NavLink
        to="/finance"
        className="hover:text-gray-300 transition"
      >
        MoneyFlow
      </NavLink>
    </nav>
  );
}

export default Navbar;