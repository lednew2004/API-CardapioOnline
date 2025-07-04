import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("bebidas", (table) => {
        table.uuid("id").primary();
        table.text("bebidasName").notNullable();
        table.text("composicao");
        table.decimal("preco", 7, 2);
    });
};


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("bebidas");
};

