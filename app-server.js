import { createServer } from "http";
import handler from "serve-handler";
import { dispatchRequest } from "./api.js";

const server = createServer(async (request, response) => {
	const url = request.url;
	const api = "/api/"

	if (url?.startsWith(api)) {
		const requestPath = url.slice(url.indexOf(api) + api.length)

		const json = await dispatchRequest(requestPath);
		response.setHeader('Content-Type', 'application/json');
		response.statusCode = 200;
		response.end(json);
	} else {
		await handler(request, response);
	}
});

const port = 5500;
server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});