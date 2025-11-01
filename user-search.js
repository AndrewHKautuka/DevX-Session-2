import { createHeading } from "./component-utils.js";
import { createFormInputs, createSubmitButton } from "./form-utils.js";

export function getUserSearch(searchLabel, sumbitFormCallback) {
	const userSearchForm = document.createElement("form");

	const heading = createHeading();
	const searchInputs = createFormInputs("search-inputs", [
		{
			id: "search",
			type: "text",
			label: searchLabel,
			placeholder: "Username"
		}
	]);
	const submitButton = createSubmitButton();

	userSearchForm.appendChild(heading);
	userSearchForm.appendChild(searchInputs);
	userSearchForm.appendChild(submitButton);

	userSearchForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(userSearchForm);
		submitButton.disabled = true

		try {
			sumbitFormCallback(formData);
		} catch (error) {
			console.log(error);
		} finally {
			submitButton.disabled = false
		}
	});

	return userSearchForm;
}