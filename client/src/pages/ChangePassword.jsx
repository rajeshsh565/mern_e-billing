import { useState } from "react";
import FormRow from "../components/FormRow";
import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const res = await customFetch.patch("/user/change-password", data);
    alert(res?.data?.msg);
    return redirect("/dashboard/home");
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmNewPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };
  const passwordsMatch = newPassword === confirmNewPassword;
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "88.5vh" }}
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
          <h1 className="mb-5 text-decoration-underline fs-1">
            Change Password:
          </h1>
          <Form
            className="ms-auto me-0"
            style={{ maxWidth: "25rem" }}
            method="post"
          >
            <FormRow
              type="password"
              name="password"
              labelName="Old Password"
              autoComplete="current-password"
            />
            <FormRow
              type="password"
              name="newPassword"
              labelName="New Password"
              minLength="8"
              onChange={handleNewPasswordChange}
              autoComplete="new-password"
            />
            <div className="position-relative">
              <FormRow
                type="password"
                name="confirmNewPassword"
                labelName="Confirm New Password"
                minLength="8"
                onChange={handleConfirmNewPasswordChange}
                autoComplete="new-password"
              />
              <span
                className="position-absolute"
                style={{ top: "55%", right: "0" }}
              >
                {newPassword && confirmNewPassword ? (
                  passwordsMatch ? (
                    <FaCheck className="text-primary" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )
                ) : (
                  ""
                )}
              </span>
            </div>
            <button className="btn btn-secondary btn-outline-dark">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default ChangePassword;
