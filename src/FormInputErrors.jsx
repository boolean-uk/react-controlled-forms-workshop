import PropTypes from "prop-types";

function FormInputErrors({ errors }) {
  return (
    <>
      {errors.map((err, index) => (
        <label key={index} className="error">
          {err}
        </label>
      ))}
    </>
  );
}

FormInputErrors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default FormInputErrors;
