import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../redux/actions/user";
import logo from "../../../assets/train-logo.jpg";
import PropTypes from "prop-types";

const Navbar = ({ isAuthenticated = false }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-full bg-blue-50 shadow p-2 md:p-4">
      <div className="justify-between px-4 mx-auto  md:items-center md:flex md:px-8">
        <div
          className={`flex justify-between w-full pb-3 mt-8  md:pb-0 md:mt-0`}
        >
          <Link to={"/"}>
            <img src={logo} className={`cursor-pointer h-12`} alt={"logo"} />
          </Link>
          {isAuthenticated ? (
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-extrabold">
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/">{user.role === "admin" ? "Routes" : "Home"}</Link>
              </li>
              {user.role !== "admin" && (
                <li className="text-gray-600 hover:text-blue-600">
                  <Link to="/reservations">Bookings</Link>
                </li>
              )}

              <li className="text-gray-600 hover:text-blue-600">
                <div className="cursor-pointer" onClick={handleLogout}>
                  Logout
                </div>
              </li>
            </ul>
          ) : (
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 font-extrabold">
              <li className="text-gray-600 hover:text-blue-600">
                <Link to="/login">Login</Link>
              </li>
              <li className="text-gray-600 hover:text-blue-600">
                <Link to={"/register"}>Register</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Navbar;
