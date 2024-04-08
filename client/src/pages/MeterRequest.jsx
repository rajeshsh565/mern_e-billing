import { Form, redirect, useLoaderData } from "react-router-dom";
import FormOptionRow from "../components/FormOptionRow";
import customFetch from "../utils/customFetch";
import { FormRow, FormTextArea } from "../components";
import { useDashboardContext } from "./DashboardLayout";
import { MeterApprove } from "../pages";

export const loader = async () => {
  try {
    const currentMeter = await customFetch.get("/meter/active-meter");
    const requestedMeter = await customFetch.get("/meter/pending-meter");
    return { currentMeter, requestedMeter };
  } catch (error) {
    return error;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const fData = Object.fromEntries(formData);
  try {
    const { data } = await customFetch.post("/meter/request-meter", fData);
    alert(`Request Successful. Assigned Meter : ${data?.meter?.meterNumber}`);
    return redirect("/dashboard/meter-management");
  } catch (error) {
    console.log(error);
    alert(error?.response?.data?.msg);
    return error;
  }
};

const MeterRequest = () => {
  const { currentMeter, requestedMeter } = useLoaderData();
  const user = useDashboardContext();
  const currMeter = currentMeter.data.meter;
  const reqMeter = requestedMeter.data.meter;

  if (user.role == "admin") {
    return <MeterApprove />;
  }
  return (
    <div className="container">
      <div className="row" style={{ minHeight: "88.5vh" }}>
        <div className="col-lg-6 d-flex align-items-center justify-content-center text-center py-4">
          <div className="w-75">
            <h3>Current Meter: </h3>
            {currMeter ? (
              <div className="row border border-primary rounded-3 mb-3 py-2">
                <div className="col-6">
                  <ul
                    className="mb-0 fw-bold overflow-auto"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <li>Meter Number</li>
                    <li>Meter Location</li>
                    <li>Meter Type</li>
                    <li>Phase Code</li>
                    <li>Bill Type</li>
                  </ul>
                </div>
                <div
                  className="col-6"
                  style={{ borderLeft: "2px dotted black" }}
                >
                  <ul
                    className="list-unstyled mb-0 overflow-auto"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <li>{currMeter.meterNumber}</li>
                    <li>{currMeter.meterLocation}</li>
                    <li>{currMeter.meterType}</li>
                    <li>{currMeter.phaseCode}</li>
                    <li>{currMeter.billType}</li>
                  </ul>
                </div>
              </div>
            ) : (
              "Meter Not Found!"
            )}
            <h3>Pending Meter Request: </h3>
            {reqMeter ? (
              <div className="row border border-danger rounded-3 py-2">
                <div className="col-6">
                  <ul
                    className="mb-0 fw-bold overflow-auto"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <li>Meter Number</li>
                    <li>Meter Location</li>
                    <li>Meter Type</li>
                    <li>Phase Code</li>
                    <li>Bill Type</li>
                  </ul>
                </div>
                <div
                  className="col-6"
                  style={{ borderLeft: "2px dotted black" }}
                >
                  <ul
                    className="list-unstyled mb-0 overflow-auto"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <li>{reqMeter.meterNumber}</li>
                    <li>{reqMeter.meterLocation}</li>
                    <li>{reqMeter.meterType}</li>
                    <li>{reqMeter.phaseCode}</li>
                    <li>{reqMeter.billType}</li>
                  </ul>
                </div>
              </div>
            ) : (
              "No Meter Request Found"
            )}
          </div>
        </div>
        <div className="col-lg-6 border-3 d-flex justify-content-center mb-3">
          <div
            className="d-flex align-items-center justify-content-center w-100 rounded-5 px-2 py-2 m-3"
            style={{
              maxWidth: "25rem",
              minHeight: "35rem",
              background: "#cccccc",
              boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)",
            }}
          >
            <div className="overflow-auto px-5" style={{ height: "30rem" }}>
              <div className="text-center">
                <h1 className="mb-5 text-decoration-underline fs-1">
                  Request Meter:
                </h1>
                <Form
                  className="ms-auto me-0"
                  style={{ maxWidth: "25rem" }}
                  method="post"
                >
                  <FormOptionRow
                    name="meterLocation"
                    labelName="Meter Location"
                    options={["inside", "outside"]}
                  />
                  <FormOptionRow
                    name="meterType"
                    labelName="Meter Type"
                    options={["electric meter"]}
                  />
                  <FormOptionRow
                    name="phaseCode"
                    labelName="Phase Code"
                    options={["011", "022", "033", "044"]}
                  />
                  <FormOptionRow
                    name="billType"
                    labelName="Bill Type"
                    options={["regular", "industrial"]}
                  />
                  <FormTextArea
                    rows="5"
                    cols="30"
                    name="address"
                    placeholder={user?.address || ""}
                  />
                  <FormRow
                    type="telephone"
                    name="phone"
                    minLength="10"
                    placeholder={user?.phone || ""}
                  />
                  <p>** by default bill will be calculated on monthly basis</p>
                  <button className="btn btn-secondary btn-outline-dark">
                    Submit
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MeterRequest;
