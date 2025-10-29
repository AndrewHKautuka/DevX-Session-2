import { createServer } from "http";
import handler from "serve-handler";

const server = createServer(async (request, response) => {
	await handler(request, response);
});

const port = 5500;
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});