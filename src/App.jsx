import { useState } from "react";
import { validateMinimumLength, validateContainsLetter } from "./utils";

import "./App.css";
import FormInputErrors from "./FormInputErrors";

const INITIAL_FORM_DATA = {
  name: "",
  password: "",
  email: "",
  save: false,
  gender: "other",
  role: "user",
};

const FORM_MODIFIED = {
  name: false,
};

const person = {
  name: "carlo",
  profession: "Teacher",
};

person["profession"]; // "Teacher"

function App() {
  // 2: controlled form (multiple state values)
  // const [name, setName] = useState("");
  // const [password, setPassword] = useState("")

  // 3: controlled form (single JS object state to represent our form data)
  const [formData, setFormData] = useState({ ...INITIAL_FORM_DATA });
  // used to detect if the user has ever interacted with any of the fields, so we can prevent
  // displaying validation errors until they have at least interacted once
  const [formDataChanged, setFormDataChanged] = useState({ ...FORM_MODIFIED });
  // 4: controlled form - concise, single update
  // 5: controlled form - validation (disable button)
  // 6: controlled form - validation (error message display)

  // 2: controlled form: all form inputs have their state controlled in React
  // via useState
  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    console.log("handleInput", name, type, value, checked);
    // 2: controlled form (multiple state values)
    // if (name === "name") {
    //   setName(value);
    // }
    // if (name === "password") {
    //   setPassword(value);
    // }
    // 3: controlled form (single JS object state to represent our form data)
    // 4: controlled form - concise, single update
    if (name !== undefined) {
      //setFormData({ ...formData, ["password"]: value });
      if (type === "checkbox") {
        setFormData({ ...formData, [name]: checked });
      } else {
        setFormData({ ...formData, [name]: value });
        setFormDataChanged({ ...formDataChanged, [name]: true });
      }
    }
  };

  // 1: uncontrolled form: all logic on form happens after submit
  // we don't store any form input values in react state
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted... preventing default behaviour");
  };

  const canSubmit = () => {
    if (formData.email.length === 0) return false;
    if (formData.name.length === 0) return false;
    if (formData.password.length === 0) return false;
    return true;
  };

  // naive form validation that returns the strings to be displayed - annoying to have multiple errors handled at once
  // const validateForm = () => {
  //   const formErrors = {
  //     nameError: "",
  //     passwordError: "",
  //   };

  //   // name validations
  //   formErrors.nameError = validateMinimumLength(formData.name, 3)
  //     ? ""
  //     : "Name must be at least 3 characters long";
  //   // password validations
  //   formErrors.passwordError = validateMinimumLength(formData.password, 8)
  //     ? ""
  //     : "Password must be at least 8 characters long.";
  //   formErrors.passwordError += validateContainsLetter(formData.password)
  //     ? ""
  //     : "Password must contain at least 1 letter";

  //   return formErrors;
  // };

  const validateForm = () => {
    const formErrors = {
      nameError: [],
      passwordError: [],
    };

    // name validations
    if (!validateMinimumLength(formData.name, 3)) {
      formErrors.nameError.push("Name must be at least 3 characters long.");
    }
    // password validations
    if (!validateMinimumLength(formData.password, 3)) {
      formErrors.passwordError.push(
        "Password must be at least 8 characters long."
      );
    }
    if (!validateContainsLetter(formData.password)) {
      formErrors.passwordError.push("Password must contain at least 1 letter");
    }

    return formErrors;
  };

  const formErrors = validateForm();

  console.log("App()", formData, canSubmit());

  console.log("name changed?", formDataChanged);

  return (
    <>
      <h1>My cool form</h1>
      <form onSubmit={handleSubmit}>
        {/* generate different form elements */}
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.nameError.length > 0 && formDataChanged.name === true && (
            <FormInputErrors errors={formErrors.nameError} />
          )}
        </div>
        <div>
          <label htmlFor="email">Your Email</label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.passwordError.length > 0 &&
            formDataChanged.password === true && (
              <FormInputErrors errors={formErrors.passwordError} />
            )}
        </div>
        <div>
          <label htmlFor="save">Save details?</label>
          <input
            id="save"
            type="checkbox"
            name="save"
            checked={formData.save}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={handleInputChange}
              checked={formData.gender === "male"}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={handleInputChange}
              checked={formData.gender === "female"}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={handleInputChange}
              checked={formData.gender === "other"}
            />
            Other
          </label>
        </div>

        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <input type="submit" disabled={canSubmit() === false} />
      </form>
    </>
  );
}

export default App;
