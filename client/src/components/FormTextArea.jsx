const FormTextArea = ({ name, rows, cols, placeholder }) => {
  return (
    <div className="row mb-3" style={{ minHeight: "5rem" }}>
      <label htmlFor={name} className="text-black text-capitalize fs-5 mb-1">
        {name}
      </label>
      <textarea
        rows={rows}
        cols={cols}
        name={name}
        id={name}
        placeholder={placeholder || ""}
        required
        className="text-center rounded-5 border border-2 py-2"
        style={{
          backgroundColor: "rgba(204,176,176,0.25)",
        }}
      />
    </div>
  );
};
export default FormTextArea;
