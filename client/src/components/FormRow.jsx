const FormRow = ({
  type,
  name,
  labelName,
  isRow = "true",
  disable,
  placeholder,
  onChange,
  autoComplete,
  minLength,
  value
}) => {
  return (
    <div className={`${isRow && `row`} mb-3`} style={{ height: "5rem" }}>
      <label
        htmlFor={name}
        className="text-black text-capitalize fs-5"
        style={{ whiteSpace: "nowrap" }}
      >
        {labelName || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        className="rounded-5 border border-2 text-center"
        style={{
          backgroundColor: "rgba(204,176,176,0.25)",
          height: "2.5rem",
        }}
        placeholder={placeholder ?? ""}
        autoComplete={autoComplete ?? ""}
        onChange={onChange}
        minLength={minLength ?? ""}
        disabled={disable ?? false}
        required
      />
    </div>
  );
};
export default FormRow;
