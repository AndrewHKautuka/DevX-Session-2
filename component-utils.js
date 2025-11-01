export function createHeading(text) {
	const heading = document.createElement("h3");
	heading.textContent = text;
	return heading;
}

export function addLabel(parent, htmlFor, content) {
	const label = document.createElement("label");
	label.htmlFor = htmlFor;
	label.textContent = content;
	parent.appendChild(label);
}