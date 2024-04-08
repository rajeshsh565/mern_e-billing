import FormOptionRow from "../components/FormOptionRow";
import { Form, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import {months} from "../utils/content"

export const loader = async ({ request }) => {
  const queryParams = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  const billResponse = await customFetch.get("/bill/get-single-bill", {
    params: queryParams,
  });
  const chargeResponse = await customFetch.get("/charge/get-charges");
  return { billResponse, chargeResponse };
};

const BillingHistory = () => {
  const { billResponse, chargeResponse } = useLoaderData();
  const { bill, msg } = billResponse.data;
  console.log(chargeResponse.data);
  const { charges } = chargeResponse.data;

  return (
    <div className="container">
      <div className="row" style={{ minHeight: "88.5vh" }}>
        <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
          <h1>Select Month and Year:</h1>
          <Form className="text-center">
            <FormOptionRow name="month" options={months} />
            <FormOptionRow name="year" options={["2022", "2023", "2024"]} />
            <button type="submit" className="btn btn-outline-success px-5 mt-3">
              Submit
            </button>
          </Form>
        </div>
        {bill ? (
          <div className="col-lg-6 d-flex flex-column align-items-center justify-content-center">
            <h1>{`Bill for ${bill.month}, ${bill.year}`}</h1>
            <div
              className="row py-2 mb-3 text-center"
              style={{ minWidth: "100%", fontSize: "1.2rem" }}
            >
              <div className="col-6 m-0 p-0">
                <ul
                  className="mb-0 list-unstyled fw-bold"
                  style={{ whiteSpace: "nowrap" }}
                >
                  <li>Meter Number</li>
                  <li>Billing Month</li>
                  <li>Units Consumed</li>
                  <li>Cost Per Unit</li>
                  <li>Charges*</li>
                  <li>Final Amount</li>
                  <li>Payment Status</li>
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
                  <li>{bill.meterNumber}</li>
                  <li>{`${bill.month}, ${bill.year}`}</li>
                  <li>{bill.units}</li>
                  <li>{`Rs. ${charges.costPerUnit}`}</li>
                  <li>{`Rs. ${
                    charges.serviceCharge + charges.meterRent
                  } /-`}</li>
                  <li>{`Rs. ${bill.billAmount} /-`}</li>
                  {bill.status == "unpaid" ? (
                    <li className="text-danger">Unpaid</li>
                  ) : (
                    <li className="text-primary">Paid</li>
                  )}
                </ul>
              </div>
              <p className="mt-3 mb-0">
                * charges include both meter rent and service charge
              </p>
            </div>
          </div>
        ) : (
          <div className="col-lg-6 d-flex align-items-center justify-content-center fs-4">
            {msg}
          </div>
        )}
      </div>
    </div>
  );
};
export default BillingHistory;
