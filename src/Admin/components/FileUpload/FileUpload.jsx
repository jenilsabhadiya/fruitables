import { useField } from "formik";

function FileUpload({ type, ...props }) {
  const [field, meta, helpers] = useField(props.name);
  // console.log(field, meta);

  return (
    <div>
      <input
        type={type}
        {...props}
        {...field}
        onChange={(event) => helpers.setValue(event.target.files[0])}
        value=""
      />

      <img
        style={{ width: "100px", height: "100px" }}
        src={
          typeof field?.value === "string"
            ? "../public/assets/img/" + field?.value
            : field?.value
            ? URL.createObjectURL(field?.value)
            : ""
        }
      />

      {meta.error && meta.touched ? (
        <p className="error">{meta.error && meta.touched ? meta.error : ""}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default FileUpload;
