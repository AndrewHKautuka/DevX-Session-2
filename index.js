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
