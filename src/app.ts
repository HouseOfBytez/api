import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/error-handler.js";
import routes from "./routes/index.js";

const app = new Hono();

app.use("*", cors());
app.use("*", logger);
app.onError(errorHandler);

app.route("/api", routes);

app.get("/", (c) => c.json({ message: "API is running" }));

export default app;
