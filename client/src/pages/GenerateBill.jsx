import { useNavigation, Form, redirect, useNavigate } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useState, useEffect, useRef } from "react";
import { FormOptionRow, FormRow } from "../components";
import { months } from "../utils/content";
import { useDashboardContext } from "./DashboardLayout";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/bill/generate-bill", data);
    alert("Bill Generation Successful!");
    return redirect("/dashboard/billing/generate-bill");
  } catch (error) {
    alert(error?.response?.data?.msg);
    return error;
  }
};

const GenerateBill = () => {
  const isSubmitting = useNavigation().state === "loading";
  const [meters, setMeters] = useState([]);
  const [user, setUser] = useState(null);
  const meterRef = useRef(null);
  const navigate = useNavigate();

  // When you use a state setter function like setMeters in React, it schedules a state update, but it doesn't happen immediately. React batches state updates for performance reasons.
  useEffect(() => {
    const fn = async () => {
      try {
        const { data } = await customFetch.get("/meter/active-meter");
        const userRes = await customFetch.post("/user/get-user", {
          userId: data?.meter[0]?.ownerId,
        });
        setMeters(data?.meter);
        setUser(userRes?.data?.user);
      } catch (error) {
        console.log(error);
        const msg = error?.response?.data?.msg;
        alert(msg);
        navigate("/dashboard/home");
      }
    };
    fn();
  }, []);
  const handleMeterOptionChange = async () => {
    const mtrNumber = meterRef.current.value;
    const selectedMtr = meters.find((meter) => meter.meterNumber == mtrNumber);
    const userRes = await customFetch.post("/user/get-user", {
      userId: selectedMtr.ownerId,
    });
    setUser(userRes?.data?.user);
  };
  return (
    <div className="container">
      {user ? (
        <div
          className="row justify-content-center"
          style={{ minHeight: "88.5vh" }}
        >
          <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
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
                <h1 className="mb-5 text-decoration-underline display-4">
                  Bill Generation
                </h1>
                <Form method="post">
                  <div className={`row mb-3`} style={{ height: "5rem" }}>
                    <label
                      htmlFor="meterNumber"
                      className="text-black text-capitalize fs-5"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Meter Number
                    </label>
                    <select
                      ref={meterRef}
                      name="meterNumber"
                      id="meterNumber"
                      onChange={handleMeterOptionChange}
                      className="rounded-5 border border-2 py-2"
                      style={{
                        backgroundColor: "rgba(204,176,176,0.25)",
                        height: "2.5rem",
                      }}
                    >
                      {meters.map((meter, index) => {
                        return (
                          <option
                            className="tooltip tooltip-inner bg-secondary"
                            key={index}
                          >
                            {meter.meterNumber}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {user ? (
                    <div
                      className="row py-2 mb-3 text-center"
                      style={{ minWidth: "100%" }}
                    >
                      <div className="col-6 m-0 p-0">
                        <ul
                          className="mb-0 list-unstyled fw-bold"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <li>Customer Name</li>
                          <li>Customer Phone</li>
                          <li>Customer Address</li>
                        </ul>
                      </div>
                      <div className="col-6 m-0 p-0">
                        <ul
                          className="mb-0 list-unstyled"
                          style={{
                            borderLeft: "2px dotted black",
                          }}
                        >
                          <li style={{ whiteSpace: "nowrap" }}>{user.name}</li>
                          <li style={{ whiteSpace: "nowrap" }}>{user.phone}</li>
                          <li>{`${user.address}`}</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="d-flex justify-content-around">
                    <div className="w-50">
                      <FormOptionRow name="month" options={months} />
                    </div>
                    <div className="w-25">
                      <FormOptionRow
                        name="year"
                        options={["2022", "2023", "2024"]}
                      />
                    </div>
                  </div>
                  <FormRow
                    type="text"
                    labelName="Units Consumed"
                    name="units"
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-success w-75 mt-3 mb-3"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="spinner-grow"></div>
      )}
    </div>
  );
};
export default GenerateBill;
