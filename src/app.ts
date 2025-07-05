import fastify from "fastify";
import { cardapioRoutes } from "./routes/cardapioRoutes";
import { env } from "./env";
import fastifyCors from "@fastify/cors";

const app = fastify();

app.register(fastifyCors, {
    origin: "*"
});

app.register(cardapioRoutes, {
    prefix: "cardapio"
});


app.listen({
    port: env.PORT,
    host: ("RENDER" in process.env) ? "0.0.0.0" : "localhost",
}).then(() => { console.log("Server running in PORT 4040") })