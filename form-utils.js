import { addLabel } from "./component-utils.js";
import { reformatDateString } from "./date-utils.js";

export function createFormInputs(id, inputs) {
	const formInputs = document.createElement("div");
	formInputs.id = id

	inputs.forEach(input => {
		addLabel(formInputs, input.id, input.label);
		if (input.type === "date") {
			addDateInput(formInputs, input.id, input.value);
		} else {
			addInput(formInputs, input.id, input.placeholder, input.value);
		}
	});

	return formInputs;
}

function addInput(parent, id, placeholder, value) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.placeholder = placeholder;
	input.required = true;
	if (value) {
		input.value = value;
	}
	parent.appendChild(input);
}

function addDateInput(parent, id, value) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.type = "date";
	input.required = true;
	const dateValue = reformatDateString(value);
	if (dateValue) {
		input.value = dateValue;
	}
	parent.appendChild(input);
}

export function createSubmitButton() {
	const submitButton = document.createElement("button");
	submitButton.textContent = "Submit";
	submitButton.type = "submit";
	return submitButton;
}