import { useLoaderData, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { useDashboardContext } from "./DashboardLayout";
import { useEffect, useState } from "react";

const BillPayment = () => {
  const user = useDashboardContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bill, setBill] = useState();
  const [pendingBills, setPendingBills] = useState([]);
  const [charges, setCharges] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await customFetch.get("/bill/get-pending-bills");
        setPendingBills(response1.data.pendingBills);

        const response2 = await customFetch.get("/charge/get-charges");
        setCharges(response2.data.charges);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [bill]);
  const handlePayClick = (bill) => {
    const payBlock = document.querySelector("#paymentBlock");
    payBlock.scrollIntoView({ behaviour: "smooth" });
    setBill(bill);
  };
  const handlePaymentProcessing = async (bill) => {
    setIsSubmitting(true);
    console.log(bill.month);
    try {
      await customFetch.patch("/bill/update-bill-status", {
        status: "paid",
        month: bill.month,
        year: bill.year,
      });
      setTimeout(() => {
        setIsSubmitting(false);
        alert("Payment Successful!");
        setBill("");
      }, 2500);
    } catch (error) {
      setIsSubmitting(false);
      alert(error?.response?.data?.msg);
    }
  };
  return (
    <div className="container">
      <div className="row border-2" style={{ minHeight: "88.5vh" }}>
        <div className="col-lg-6 d-flex justify-content-center">
          <div className="text-center px-3 py-4">
            <h1>Pending Bills</h1>
            <div className="d-flex flex-wrap justify-content-around">
              {pendingBills.map((bill, index) => {
                const { month, year, billAmount, status } = bill;
                return (
                  <div
                    className="d-flex align-items-center justify-content-center rounded-5 px-5 py-5 m-3"
                    style={{
                      width: "12.5rem",
                      height: "10rem",
                      background: "#cccccc",
                      boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)",
                    }}
                    key={index}
                  >
                    <div
                      className="text-center position-relative"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      <h5 className="mb-3 fw-bold">{`${year}, ${month}`}</h5>
                      <b className="d-block">
                        Bill Amount:{" "}
                        <span className="fw-normal">{`Rs. ${billAmount}`}</span>
                      </b>
                      <b className="d-block">
                        Status:{" "}
                        <span className="fw-normal text-danger">{`${status}`}</span>
                      </b>
                      <button
                        className="btn btn-outline-primary mt-2 float-end py-1 px-3"
                        onClick={() => handlePayClick(bill)}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          className="col-lg-6 d-flex justify-content-center"
          id="paymentBlock"
        >
          <div
            className="d-flex align-items-center justify-content-center w-100 rounded-5 px-4 py-5 m-3"
            style={{
              maxWidth: "25rem",
              minHeight: "35rem",
              background: "#cccccc",
              boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)",
            }}
          >
            <div className="text-center w-100">
              <h1>Bill Payment</h1>
              {bill ? (
                isSubmitting ? (
                  <div>
                    <div class="spinner-border" role="status"></div>
                    <div>Processing...</div>
                  </div>
                ) : (
                  <div className="row py-2 mb-3" style={{ minWidth: "100%" }}>
                    <div className="col-6 m-0 p-0">
                      <ul
                        className="mb-0 list-unstyled fw-bold"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        <li>Customer Name</li>
                        <li>Meter Number</li>
                        <li>Billing Month</li>
                        <li>Units Consumed</li>
                        <li>Cost Per Unit</li>
                        <li>Charges*</li>
                        <li>Final Amount</li>
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
                        <li>{bill.meterNumber}</li>
                        <li>{`${bill.month}, ${bill.year}`}</li>
                        <li>{bill.units}</li>
                        <li>{`Rs. ${charges.costPerUnit}`}</li>
                        <li>{`Rs. ${
                          charges.serviceCharge + charges.meterRent
                        } /-`}</li>
                        <li>{`Rs. ${bill.billAmount} /-`}</li>
                      </ul>
                    </div>
                    <p className="mt-3 mb-0">
                      * charges include both meter rent and service charge
                    </p>
                    <p className="mt-0">
                      ** by default bill will be calculated on monthly basis
                    </p>
                    <button
                      className="btn btn-outline-success mt-4"
                      onClick={() => handlePaymentProcessing(bill)}
                    >
                      {isSubmitting
                        ? "Processing Payment..."
                        : "Proceed to Pay"}
                    </button>
                  </div>
                )
              ) : (
                <div className="mb-3 fs-5">Please select a bill to pay</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BillPayment;

// const charges = {
//     costPerUnit: 5.5,
//     serviceCharge: 51.25,
//     meterRent: 125,
//   };
//   const pendingBills = [
//     {
//       meterNumber: "524587",
//       month: "September",
//       year: "2023",
//       units: 60,
//       billAmount: 506.25,
//       ownerId: "65fdf04a4e71ff329d1a1095",
//       status: "unpaid",
//       createdAt: "2024-04-01T12:20:50.958+00:00",
//       updatedAt: "2024-04-01T14:13:29.394+00:00",
//     },
//   ];
