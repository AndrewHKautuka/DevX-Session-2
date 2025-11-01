export function reformatDateString(dateString) {
	const dateObject = new Date(dateString);

	if (Number.isNaN(dateObject.getTime())) {
		return null;
	}

	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
	const day = dateObject.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}