import { stdin, stdout } from "process";
import readline from "readline/promises";

const rl = readline.createInterface({
	input: stdin,
	output: stdout
})

async function readVal(p) {
	let res = await rl.question(p);
	return res;
}

async function showMenu() {
	const res = await readVal("1. Show available users \n2. Create a new user \n3. Delete user\n4. Exit \nChoose an option: ");
	return res;
}

async function createUser() {
	const name = await readVal("Enter name: ");
	const username = await readVal("Enter username: ");
	const email = await readVal("Enter email: ");
	const day = Number(await readVal("Enter day in dob: "))
	const month = Number(await readVal("Enter month in dob(1 - 12): "));
	const year = Number(await readVal("Enter year in dob: "));
	const dob = new Date(year, month - 1, day + 1); //month is 0 indexed in JS Date object

	return { name, username, email, dob: dob.toDateString() }
}