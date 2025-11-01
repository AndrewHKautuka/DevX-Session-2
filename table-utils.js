export function createTHead(table, headers) {
	const thead = table.createTHead();
	const headerRow = thead.insertRow();

	headers.forEach(content => {
		headerRow
		const th = document.createElement("th");
		th.textContent = content;
		headerRow.appendChild(th);
	});
}

export function createCell(row, content) {
	const cell = row.insertCell();
	cell.textContent = content;
}