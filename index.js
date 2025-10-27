import { stdin, stdout } from "process";
import readline from "readline/promises";
import { sql } from "./constants/db.js";

const rl = readline.createInterface({
	input: stdin,
	output: stdout
})

async function readVal(p) {
	let res = await rl.question(p);
	return res;
}

async function showMenu() {
	const res = await readVal(`
1. Show available users
2. Create a new user
3. Search for user
4. Edit existing user
5. Delete user
6. Exit
Choose an option: `);

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

	return { name, username, email, dob: dob.toDateString() };
}

async function showUser(user) {
	console.log(`Current name: ${user.name}`);
	console.log(`Current email: ${user.email}`);
	console.log(`Current dob: ${new Date(user.dob).toLocaleDateString()}\n`);
}

async function editUser() {
	const name = await readVal("Edit name: ");
	const email = await readVal("Edit email: ");
	const day = Number(await readVal("Edit day in dob: "))
	const month = Number(await readVal("Edit month in dob(1 - 12): "));
	const year = Number(await readVal("Edit year in dob: "));
	const dob = new Date(year, month - 1, day + 1); //month is 0 indexed in JS Date object

	return { name, email, dob: dob.toDateString() };
}

async function main() {
	let loop = true;

	do {
		const option = Number(await showMenu());

		try {
			switch (option) {
				case 1: {
					//get all users and display
					const users = await sql`SELECT * FROM users;`;

					console.log("\nAvailable users:");

					if (users.length === 0) {
						console.log("No users found.\n");
						break;
					}

					users.forEach((user, index) => {
						console.log(`${index + 1} : ${JSON.stringify(user)}`);
					});

					console.log("\n");

					break;
				}

				case 2: {
					//create new user
					console.log("Create new user");
					const user = await createUser();

					await sql`INSERT INTO users (name, dob, username, email) VALUES(${user.name}, ${user.dob}, ${user.username}, ${user.email})`;
					console.log("User added successfully!\n")

					break;
				}

				case 3: {
					//Search for user
					console.log("Search for user");
					const username = await readVal("Enter username of user to search for: ");
					const user = (await sql`SELECT * FROM users WHERE username = ${username};`)[0];

					if (!user) {
						console.log(`No user with username "${username}" found.\n`);
						break;
					}

					await showUser(user);

					break;
				}

				case 4: {
					//Edit user
					console.log("Edit existing user");
					const username = await readVal("Enter username of user to edit: ");
					const current_user = (await sql`SELECT * FROM users WHERE username = ${username};`)[0];

					if (!current_user) {
						console.log(`No user with username "${username}" found.\n`);
						break;
					}

					await showUser(current_user);
					const updated_user = await editUser()

					await sql`UPDATE users SET name = ${updated_user.name}, dob = ${updated_user.dob}, email = ${updated_user.email} WHERE username = ${current_user.username}`;

					break;
				}

				case 5: {
					//Delete user
					console.log("Delete user");
					const username = await readVal("Enter username of user to delete: ");

					await sql`DELETE FROM users WHERE username = ${username};`;
					console.log("User successfully deleted.\n");

					break;
				}

				case 6: {
					//Exit
					loop = false;
					console.log("Exiting...\n");
					break;
				}

				default: {
					//invalid option
					console.log("Invalid option\n");
				}
			}
		} catch (error) {
			console.error("An error occured: ", error);
			console.log("\n");
		}

	} while (loop);

	process.exit(0);
}

await main();