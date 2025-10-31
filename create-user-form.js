import { createFormInputs, createHeading, createSubmitButton } from "./form-utils.js";

export function getCreateUserForm(sumbitFormCallback) {
	const createUserForm = document.createElement("form");

	const heading = createHeading("Create New User");
	const formInputs = createFormInputs("form-inputs", [
		{
			id: "username",
			type: "text",
			label: "Username:",
			placeholder: "Username"
		},
		{
			id: "name",
			type: "text",
			label: "Name:",
			placeholder: "Name"
		},
		{
			id: "email",
			type: "text",
			label: "Email:",
			placeholder: "Email"
		},
		{
			id: "dob",
			type: "date",
			label: "Date of Birth:"
		}
	]);
	const submitButton = createSubmitButton();

	createUserForm.appendChild(heading);
	createUserForm.appendChild(formInputs);
	createUserForm.appendChild(submitButton);

	createUserForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(createUserForm);
		submitButton.disabled = true

		try {
			sumbitFormCallback(formData);
		} catch (error) {
			console.log(error);
		} finally {
			submitButton.disabled = false
		}
	});

	return createUserForm;
}
