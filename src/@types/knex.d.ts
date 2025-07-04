import { Knex } from "knex";

declare module "knex/types/tables" {
    export interface Tables {
        hamburguers: {
            id: string,
            hamburguerName: string,
            composicao: string
            preco: number
        },
        pizzas: {
            id: string,
            pizzaName: string,
            composicao: string,
            preco: number
        },
        fritas: {
            id: string,
            fritasName: string,
            composicao: string,
            preco: number
        },
        bebidas: {
            id: string,
            bebidasName: string,
            composicao: string,
            preco: number
        }
    }
}