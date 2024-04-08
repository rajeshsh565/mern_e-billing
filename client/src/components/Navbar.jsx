import { NavLinks } from "../components";
import logo from "../assets/images/logo2.png";
import { FaEdit, FaLock, FaUser } from "react-icons/fa";
import { TbPassword } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "../pages/DashboardLayout";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useDashboardContext();
  const logout = async () => {
    try {
      await customFetch.get("/auth/logout");
      alert("Logging Out...");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-secondary sticky-top"
      style={{ minHeight: "4rem" }}
    >
      <div className="container-fluid">
        {/* Warning: link cant be inside link. */}
        <div
          className="navbar-brand"
          style={{ height: "4.5rem", width: "4rem", marginTop: "-0.75rem" }}
        >
          <img src={logo} alt="E-Bill" className="w-100" />
        </div>
        <div>
          <span className="d-lg-none dropdown me-4">
            <Link
              className="dropdown-toggle text-black"
              data-bs-toggle="dropdown"
              role="button"
              to="/"
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  className="object-fit-cover rounded-circle"
                  style={{ height: "2.5rem", width: "2.5rem" }}
                />
              ) : (
                <FaUser className="fs-4" />
              )}
            </Link>
            <div className="dropdown-menu" style={{ minWidth: "10px" }}>
              <Link className="dropdown-item" to="profile">
                <FaEdit className="me-2" /> Profile
              </Link>
              <Link className="dropdown-item" to="change-password">
                <TbPassword className="me-2" />
                Change
                <br />
                Password
              </Link>
              <button className="dropdown-item" onClick={logout}>
                <FaLock className="me-2" />
                Logout
              </button>
            </div>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsable-links"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="collapsable-links">
          <NavLinks />
        </div>
      </div>
      <div className="nav-item dropdown d-none d-lg-flex me-5 fs-5">
        <Link
          className="dropdown-toggle text-black me-3"
          data-bs-toggle="dropdown"
          role="button"
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              className="object-fit-cover rounded-circle"
              style={{ height: "3rem", width: "3rem" }}
            />
          ) : (
            <FaUser className="fs-2" />
          )}
        </Link>
        <div className="dropdown-menu" style={{ minWidth: "10px" }}>
          <Link
            className="dropdown-item"
            to="profile"
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              placeItems: "center",
            }}
          >
            <FaEdit className="me-2" /> Profile
          </Link>
          <Link className="dropdown-item" to="change-password">
            <TbPassword className="me-2" />
            Change <br />
            Password
          </Link>
          <button
            className="dropdown-item"
            onClick={logout}
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              placeItems: "center",
            }}
          >
            <FaLock className="me-2" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
