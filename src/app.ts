import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error-handler.js";
import { rateLimiter } from "./middleware/rate-limiter.js";
import routes from "./routes/index.js";

const app = new Hono();

app.use("*", cors());
app.use("*", secureHeaders());
app.use("*", logger);
app.use("/api/*", rateLimiter());
app.onError(errorHandler);

app.route("/api", routes);

app.get("/", (c) => c.json(
	{
		message: "API is running"
	}
));

app.notFound((c) => c.json(
	{
		error: "Not Found"
	},
	404
));

export default app;
