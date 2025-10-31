import { createServer } from "http";
import handler from "serve-handler";
import { dispatchRequest } from "./api.js";

const server = createServer(async (request, response) => {
	const url = request.url;
	const method = request.method;
	const api = "/api/"

	if (method && url?.startsWith(api)) {
		const requestPath = url.slice(url.indexOf(api) + api.length)

		let requestBody = "";

		// Wait for the request body to be fully received
		for await (const chunk of request) {
			requestBody += chunk.toString();
		}

		let parsedBody = requestBody
		if (requestBody) {
			try {
				parsedBody = JSON.parse(requestBody);
			} catch (error) {
				console.error("Error parsing JSON:", error);
				response.writeHead(400, { "Content-Type": "application/json" });
				response.end(JSON.stringify({ error: "Invalid JSON" }));
				return;
			}
		}

		const json = await dispatchRequest(method, requestPath, parsedBody);
		response.setHeader("Content-Type", "application/json");
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