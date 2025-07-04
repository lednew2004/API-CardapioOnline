import { knex } from "../database";
import { z } from "zod";
import { randomUUID } from "node:crypto";


export async function cardapioRoutes(app: import("fastify").FastifyInstance) {

    app.get("/hamburguers", async () => {
        const burguers = await knex("hamburguers").select();
        return burguers;
    });

    app.get("/pizzas", async (request, reply) => {
        const pizzas = await knex("pizzas").select();

        return pizzas
    })

    app.get("/fritas", async (request, reply) => {
        const fritas = await knex("fritas").select();

        return fritas
    })

    app.get("/bebidas", async (request, reply) => {
        const bebidas = await knex('bebidas').select();

        return bebidas;
    });


    app.post("/hamburguers", async (request, reply) => {
        const schemaBody = z.object({
            hamburguerName: z.string(),
            composicao: z.string(),
            preco: z.number()
        });

        const { hamburguerName, composicao, preco } = schemaBody.parse(request.body);

        await knex("hamburguers").insert({
            id: randomUUID(),
            hamburguerName,
            composicao,
            preco
        });
    });

    app.post("/pizzas", async (request, reply) => {
        const schemaBody = z.object({
            pizzaName: z.string(),
            composicao: z.string(),
            preco: z.number()
        });

        const { pizzaName, composicao, preco } = schemaBody.parse(request.body);

        await knex("pizzas").insert({
            id: randomUUID(),
            pizzaName,
            composicao,
            preco
        });

        return reply.status(201).send("Adiciondo");
    });

    app.post("/fritas", async (request, reply) => {
        const schemaBody = z.object({
            fritasName: z.string(),
            composicao: z.string(),
            preco: z.number()
        });

        const { fritasName, composicao, preco } = schemaBody.parse(request.body);

        await knex("fritas").insert({
            id: randomUUID(),
            fritasName,
            composicao,
            preco
        });

        return reply.status(201).send("Adicionado")

    });

    app.post("/bebidas", async (request, reply) => {
        const schemaBody = z.object({
            bebidasName: z.string(),
            composicao: z.string(),
            preco: z.number()
        });

        const { bebidasName, composicao, preco } = schemaBody.parse(request.body);

        await knex("bebidas").insert({
            id: randomUUID(),
            bebidasName,
            composicao,
            preco
        });

        return reply.status(201).send("Adicionado")
    });

    app.delete("/:id", async (request, reply) => {
        const schemaParams = z.object({
            id: z.string()
        });

        const { id } = schemaParams.parse(request.params);

        await knex("hamburguers").where("id", id).del();

        return reply.status(201).send("Escluido");
    });
};