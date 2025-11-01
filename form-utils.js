import { addLabel } from "./component-utils.js";

export function createFormInputs(id, inputs) {
	const formInputs = document.createElement("div");
	formInputs.id = id

	inputs.forEach(input => {
		addLabel(formInputs, input.id, input.label);
		if (input.type === "date") {
			addDateInput(formInputs, input.id);
		} else {
			addInput(formInputs, input.id, input.placeholder);
		}
	});

	return formInputs;
}

function addInput(parent, id, placeholder) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.placeholder = placeholder;
	input.required = true;
	parent.appendChild(input);
}

function addDateInput(parent, id) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.type = "date";
	input.required = true;
	parent.appendChild(input);
}

export function createSubmitButton() {
	const submitButton = document.createElement("button");
	submitButton.textContent = "Submit";
	submitButton.type = "submit";
	return submitButton;
}