import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job") {
      setPerson({ name: person.name, job: value });
    } else {
      setPerson({ name: value, job: person.job });
    }
  }

  function submitForm(event) {
    event.preventDefault(); // Prevent form from reloading the page
    props.handleSubmit(person); // Submit the form data to the parent component
    setPerson({ name: "", job: "" }); // Reset the form fields
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;
