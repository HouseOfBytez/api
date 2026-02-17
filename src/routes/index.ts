import { Hono } from "hono";
import health from "./health.js";
import example from "./example.js";

const routes = new Hono();

routes.route("/health", health);
routes.route("/example", example);

export default routes;
