const FormOptionRow = ({ type, name, labelName, isRow = "true", options }) => {
  return (
    <div className={`${isRow && `row`} mb-3`} style={{ height: "5rem" }}>
      <label
        htmlFor={name}
        className="text-black text-capitalize fs-5"
        style={{ whiteSpace: "nowrap" }}
      >
        {labelName || name}
      </label>
      <select
        type={type}
        name={name}
        id={name}
        className="rounded-5 border border-2 text-center"
        style={{
          backgroundColor: "rgba(204,176,176,0.25)",
          height: "2.5rem",
        }}
      >
        {options.map((option, index) => {
          return (
            <option className="tooltip tooltip-inner bg-secondary" key={index}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormOptionRow;
