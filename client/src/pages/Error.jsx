import { useRouteError } from "react-router-dom";
import not_found from "../assets/images/not_found.svg";

const Error = () => {
  const error = useRouteError();
  const isNotFoundError = error.status === 404;
  return (
    <div className="container">
      <div
        className="row no-gutter align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div
          className={`text-center mt-5 ${!isNotFoundError && `d-none`}`}
          style={{ height: "20rem" }}
        >
          <img src={not_found} alt="error 404" className="img-fluid h-100" />
        </div>
        <h1 className="text-center mb-5">
          {isNotFoundError ? `Page Not Found!` : `Something went Wrong!`}
        </h1>
      </div>
    </div>
  );
};
export default Error;
