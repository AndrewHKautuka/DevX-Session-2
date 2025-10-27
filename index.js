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