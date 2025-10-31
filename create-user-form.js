export function getCreateUserForm(sumbitFormCallback) {
	const createUserForm = document.createElement("form");

	addHeading(createUserForm);
	addFormInputs(createUserForm);

	const submitButton = createSubmitButton(createUserForm);
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

function addHeading(parent) {
	const heading = document.createElement("h3");
	heading.textContent = "Create New User";
	parent.appendChild(heading);
}

function addFormInputs(parent) {
	const formInputs = document.createElement("div");
	formInputs.id = "form-inputs"

	const usernameId = "username";
	addLabel(formInputs, usernameId, "Username:");
	addInput(formInputs, usernameId, "Username");

	const nameId = "name";
	addLabel(formInputs, nameId, "Name:");
	addInput(formInputs, nameId, "Name");

	const emailId = "email";
	addLabel(formInputs, emailId, "Email:");
	addInput(formInputs, emailId, "Email");

	const dobId = "dob";
	addLabel(formInputs, dobId, "Date of Birth:");
	addDOBInput(formInputs, dobId);

	parent.appendChild(formInputs);
}

function addLabel(parent, htmlFor, content) {
	const label = document.createElement("label");
	label.htmlFor = htmlFor;
	label.textContent = content;
	parent.appendChild(label);
}

function addInput(parent, id, placeholder) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.placeholder = placeholder;
	input.required = true;
	parent.appendChild(input);
}

function addDOBInput(parent, id) {
	const input = document.createElement("input");
	input.id = id;
	input.name = id;
	input.type = "date";
	input.required = true;
	parent.appendChild(input);
}

function createSubmitButton() {
	const submitButton = document.createElement("button");
	submitButton.textContent = "Submit";
	submitButton.type = "submit";
	return submitButton;
}