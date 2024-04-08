import { FaArrowDown, FaArrowRight, FaCheck } from "react-icons/fa";
import { trivia } from "../utils/content";
import { FormRow, FormTextArea } from "../components";
const Help = () => {
  return (
    <div className="container">
      <div className="row" style={{ minHeight: "88.5vh" }}>
        <div className="col-lg-6 d-flex flex-column position-relative py-3">
          <h1>Frequently Asked Questions :-</h1>
          {trivia.map((single, index) => {
            const { question, answer } = single;
            return (
              <div
                className="w-100 border border-black rounded-3 d-flex align-items-center pt-1 px-2 mt-2"
                style={{ transition: "all 1s ease-in" }}
              >
                <div className="position-absolute" style={{left:"1rem"}}>
                <FaArrowRight
                  onClick={(e) => {
                    e.currentTarget.classList.toggle("d-none");
                    e.currentTarget.nextElementSibling.classList.toggle(
                      "d-none"
                    );
                    e.currentTarget.parentElement.nextSibling.firstElementChild.nextElementSibling.classList.toggle(
                      "d-none"
                    );
                  }}
                 style={{fontSize:"25px"}}/>
                <FaArrowDown
                  className="d-none"
                  onClick={(e) => {
                    e.currentTarget.classList.toggle("d-none");
                    e.currentTarget.previousElementSibling.classList.toggle(
                      "d-none"
                    );
                    e.currentTarget.parentElement.nextSibling.firstElementChild.nextElementSibling.classList.toggle(
                      "d-none"
                    );
                  }}
                 style={{fontSize:"25px"}}/>
                </div>
                <div>
                  <h5 className="ps-5 pe-3 my-3 fw-bold">{`Q${
                    index + 1
                  }. ${question}`}</h5>
                  <p className="lead d-none ps-5">{`Ans. ${answer}`}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-lg-6 d-flex justify-content-center py-3">
          <div
            className="d-flex justify-content-center align-items-center w-100 rounded-5 px-5 py-5 m-3"
            style={{
              maxWidth: "25rem",
              maxHeight: "50rem",
              background: "#cccccc",
              boxShadow: "4px 4px 4px 4px rgba(0,0,0, 0.4)",
            }}
          >
            <div className="text-center">
              <h1 className="mb-5 text-decoration-underline display-4">
                Contact Us
              </h1>
              <form method="post" action="https://formspree.io/f/xzbnjwoa">
                <FormRow type="email" name="email" autoComplete="off" />
                <FormRow type="subject" name="subject" autoComplete="off" />
                <FormTextArea name="message" rows="8" />
                <button
                  type="submit"
                  className="btn btn-secondary btn-outline-dark mt-3 mb-3"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Help;