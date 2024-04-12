import { Link } from "react-router-dom";
import img1 from "../assets/images/img-1.jpeg";
import logo from "../assets/images/logo2.png";

const LandingPage = () => {
  return (
    <div className="container m-0">
      <div
        className="row align-items-center"
        style={{
          height: "100vh",
          width: "100vw",
          background: `linear-gradient(to left, rgba(240, 157, 157, 1), rgba(197, 93, 93, 0.25)),
          url(${img1}) center/cover no-repeat`,
        }}
      >
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "7.5rem",
            }}
          />
        </div>
        <div className="col-md-6 text-center text-md-start">
          <h1 className="text-dark">
            Simplify Your Life, <p>Manage Your Bills Online</p>
          </h1>
          <p
            className="text-dark fs-4"
            style={{ letterSpacing: "2px", wordSpacing: "0.75rem" }}
          >
            Welcome to a smarter way to manage your electricity bills! Our
            easy-to-use online system lets you pay your bills anytime, anywhere.
            No more waiting in lines or worrying about late fees. Our secure
            platform ensures a smooth and hassle-free experience.
          </p>
          <Link
            to="/login"
            className="btn btn-secondary btn-outline-dark fw-bolder fs-3"
            style={{ minWidth: "10rem",boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)" }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
