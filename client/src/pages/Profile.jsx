import { FaUser } from "react-icons/fa";
import { FormRow, FormTextArea } from "../components";
import { Form, redirect, useLoaderData, useNavigation } from "react-router-dom";
import { useDashboardContext } from "./DashboardLayout";
import customFetch from "../utils/customFetch";
import placeholderImage from "../assets/images/avatar-placeholder.svg";

export const loader = async () => {
  const { data } = await customFetch.get("/meter/active-meter");
  return data;
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  try {
    await customFetch.patch("/user/update-user", formData);
    alert("User Info updated Successully");
    return redirect("/dashboard/home");
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.msg);
    return error;
  }
};

const Profile = () => {
  const isSubmitting = useNavigation().state === "submitting";
  const user = useDashboardContext();
  const { meterNumber } = useLoaderData().meter;
  return (
    <div className="container">
      <div className="row my-lg-5 justify-content-evenly mx-1">
        <div className="col-lg-4 d-flex flex-column justify-content-center align-items-center">
          <div
            className="d-flex rounded-circle bg-secondary"
            style={{
              width: "17.5rem",
              height: "17.5rem",
              zIndex: 999,
            }}
          >
            {user.avatar ? (
              <img
                src={user.avatar}
                className="w-100 rounded-circle"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <img src={placeholderImage} className="w-100" />
            )}
          </div>
        </div>
        <div
          className="col-lg-8 text-center rounded-5 text-black ms-lg-5 profile mb-5"
          style={{
            maxWidth: "25rem",
            backgroundColor: "#cccccc",
            boxShadow: "4px 4px 4px 4px rgba(0,0,0,0.4)",
          }}
        >
          <div className="px-5 py-3">
            <h2 className="mb-5 text-decoration-underline">Update User Info</h2>
            <Form method="post" encType="multipart/form-data">
              <FormRow type="text" name="name" placeholder={user.name} />
              <FormRow type="tel" name="phone" placeholder={user.phone} />
              <FormTextArea
                rows="5"
                cols="30"
                name="address"
                placeholder={user.address}
              />
              <FormRow
                type="text"
                name="meterNumber"
                labelName="Meter Number"
                placeholder={meterNumber}
                disable={true}
              />
              <div className="w-100" style={{ height: "5rem" }}>
                <label
                  htmlFor="avatar"
                  className="text-black text-capitalize fs-5 mb-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Select an Image (Max. 5MB)
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="images/*"
                  className="w-50"
                  style={{
                    height: "2.5rem",
                  }}
                ></input>
              </div>
              <button className="btn btn-secondary btn-outline-dark mt-3 mb-3">
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
