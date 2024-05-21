import { useEffect, useRef, useState } from "react";
import customFetch from "../utils/customFetch";
import { Form, useNavigation } from "react-router-dom";
import { useDashboardContext } from "./DashboardLayout";

const MeterApprove = () => {
  const [meters, setMeters] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState(null);
  const [user, setUser] = useState(null);
  const isSubmitting = useNavigation().state === "loading";

  useEffect(() => {
    const fn = async () => {
      const { data } = await customFetch.get("/meter/pending-meter");
      setMeters(data?.meter);
    };
    fn();
  }, [selectedMeter]);
  const meterRef = useRef(null);

  const handleSubmit = async () => {
    const mtrNumSelected = meterRef.current.value;
    const mtrObj = meters.find((meter) => meter.meterNumber == mtrNumSelected);
    const { data } = await customFetch.post("/user/get-user", {userId:mtrObj.ownerId});
    setUser(data?.user);
    setSelectedMeter(mtrObj);
  };

  const handleApprove = async () => {
    const bData= {
      meterNumber:selectedMeter.meterNumber,
        approval: "approve"
    }
    try {
      const { data } = await customFetch.post("/meter/approve-meter", bData);
      alert(data?.msg);
      setSelectedMeter(null);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const { data } = await customFetch.post("/meter/approve-meter", {
        meterNumber: selectedMeter.meterNumber,
        approval: "reject",
      });
      alert(data?.msg);
      setSelectedMeter(null);
    } catch (error) {
      alert(error?.response?.data?.msg);
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row" style={{ minHeight: "88.5vh" }}>
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center">
          <h2>Choose Pending Meter for Approval or Rejection:-</h2>
          <Form className="my-3 text-center" method="post">
            <select
              ref={meterRef}
              name="meterNumber"
              id="meterNumber"
              className="rounded-5 border border-2 py-2 d-block"
              style={{
                backgroundColor: "rgba(204,176,176,0.25)",
                minWidth: "15rem",
              }}
            >
              {meters.map((meter, index) => {
                return (
                  <option
                    className="tooltip tooltip-inner bg-secondary position-relative float-start"
                    key={index}
                  >
                    {meter.meterNumber}
                  </option>
                );
              })}
            </select>
            <button
              className="btn btn-outline-success mt-4 w-50"
              onClick={handleSubmit}
              type="button"
            >
              Submit
            </button>
          </Form>
        </div>
        {selectedMeter ? (
          <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
            <h2>Meter Details</h2>
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
                  <li>Meter Number</li>
                  <li>Meter Location</li>
                  <li>Phase Code</li>
                  <li>Bill Type</li>
                  <li>Status</li>
                </ul>
              </div>
              <div className="col-6 m-0 p-0">
                <ul
                  className="mb-0 list-unstyled"
                  style={{
                    whiteSpace: "nowrap",
                    borderLeft: "2px dotted black",
                  }}
                >
                  <li>{user.name}</li>
                  <li>{selectedMeter.meterNumber}</li>
                  <li>{`${selectedMeter.meterLocation}`}</li>
                  <li>{selectedMeter.phaseCode}</li>
                  <li>{selectedMeter.billType}</li>
                  <li>{selectedMeter.status}</li>
                </ul>
              </div>
              <button
                className="btn btn-outline-success mt-4"
                onClick={handleApprove}
                disabled={isSubmitting}
              >{`${isSubmitting ? `Approving...` : `Approve`}`}</button>
              <button
                className="btn btn-outline-danger mt-2"
                onClick={handleReject}
                disabled={isSubmitting}
              >{`${isSubmitting ? `Rejecting...` : `Reject`}`}</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default MeterApprove;
