import { createHeading } from "./component-utils.js";
import { createFormInputs, createSubmitButton } from "./form-utils.js";

export function getEditUserForm(user, sumbitFormCallback) {
	const editUserForm = document.createElement("form");
	editUserForm.className = "middle-content-child";

	const heading = createHeading("Edit Existing User");
	const formInputs = createFormInputs("form-inputs", [
		{
			id: "name",
			type: "text",
			label: "Name:",
			placeholder: "Name",
			value: user.name
		},
		{
			id: "email",
			type: "text",
			label: "Email:",
			placeholder: "Email",
			value: user.email
		},
		{
			id: "dob",
			type: "date",
			label: "Date of Birth:",
			value: user.dob
		}
	]);
	const submitButton = createSubmitButton();

	editUserForm.appendChild(heading);
	editUserForm.appendChild(formInputs);
	editUserForm.appendChild(submitButton);

	editUserForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(editUserForm);
		submitButton.disabled = true

		try {
			sumbitFormCallback(formData);
		} catch (error) {
			console.log(error);
		} finally {
			submitButton.disabled = false
		}
	});

	return editUserForm;
}
