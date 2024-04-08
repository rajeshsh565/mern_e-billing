import { NavLink } from "react-router-dom";
import {links} from "../utils/content";
import { useDashboardContext } from "../pages/DashboardLayout";

const NavLinks = () => {
  const user = useDashboardContext();
  return (
    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      {links.map((link) => {
        const { path, text } = link;
        if (path === "billing") {
          return (
            <span className="nav-item dropdown" key={text}>
              <NavLink
                className="nav-link dropdown-toggle text-capitalize"
                data-bs-toggle="dropdown"
                to="/"
              >
                {text}
              </NavLink>
              <div className="dropdown-menu">
                {link.child.map((a) => {
                  if(user.role=="admin" && (a.path=="billing/bill-pay" || a.path=="billing/bill-history")){
                    return;
                  }
                  if(user.role=="user" && (a.path=="billing/generate-bill")){
                    return;
                  }
                  return (
                    <NavLink
                      to={a.path}
                      className="text-capitalize dropdown-item"
                      style={{ minWidth: "10px" }}
                      key={a.text}
                    >
                      {a.text}
                    </NavLink>
                  );
                })}
              </div>
            </span>
          );
        }
        return (
          <span className="nav-item" key={text}>
            <NavLink to={path} className="nav-link text-capitalize">
              {text}
            </NavLink>
          </span>
        );
      })}
    </ul>
  );
};
export default NavLinks;
