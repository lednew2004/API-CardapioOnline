import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("hamburguers", (table) => {
        table.uuid("id").primary();
        table.text("hamburguerName").notNullable();
        table.text("composicao");
        table.decimal("preco", 7, 2);
    });
};


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("hamburguers");
};

