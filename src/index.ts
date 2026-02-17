import { serve } from "@hono/node-server";
import { env } from "./env.js";
import app from "./app.js";

const server = serve({ fetch: app.fetch, port: env.PORT }, (info) => {
	console.log(`Server running on http://localhost:${info.port}`);
});

function shutdown() {
	console.log("\nShutting down gracefully...");
	server.close(() => {
		console.log("Server closed");
		process.exit(0);
	});
	setTimeout(() => {
		console.error("Forced shutdown after timeout");
		process.exit(1);
	}, 10_000);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
