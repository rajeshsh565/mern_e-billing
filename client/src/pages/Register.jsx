import { Form, Link, redirect, useNavigation } from "react-router-dom";
import { FormRow, FormTextArea } from "../components";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    return redirect("/login");
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const isSubmitting = useNavigation().state === "submitting";
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="d-flex align-items-center justify-content-center w-100 rounded-5 px-5 py-5 m-3"
        style={{
          maxWidth: "25rem",
          minHeight: "35rem",
          background: "#cccccc",
          boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)",
        }}
      >
        <div className="text-center">
          <h1 className="mb-5 text-decoration-underline display-4">Register</h1>
          <Form method="post">
            <FormRow type="text" name="name" />
            <FormRow type="email" name="email" />
            <FormRow type="password" name="password" autoComplete="off" />
            <button className="btn btn-secondary btn-outline-dark mt-3 mb-3">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <p className="lead mt-3 mb-0">
              Already Registered?{" "}
              <span>
                <Link to="/login" className="fs-4 text-decoration-none">
                  Login Here
                </Link>
              </span>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Register;
