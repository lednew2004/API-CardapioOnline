import { z } from "zod";
import { configDotenv } from "dotenv";
configDotenv();

const schemaEnv = z.object({
    DATABASE_URL: z.string(),
    PORT: z.number().default(4040)
});

const _env = schemaEnv.safeParse(process.env);

if (_env.success == false) {
    console.error("Variavel de ambiente invalida", _env.error.format());

    throw new Error("Variavel de ambiente invalida");
};

export const env = _env.data; 