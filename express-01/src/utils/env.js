import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(4001),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  ALLOWED_ORIGINS: z.string().min(1),
  JWT_SECRET: z.string().min(10),
  SYNC_DATABASE: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
  ERASE_DATABASE_ON_SYNC: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true"),
});

const result = envSchema.safeParse({
  ...process.env,
  JWT_SECRET: process.env.JWT_SECRET ?? process.env.MY_SECRET,
});

if (!result.success) {
  console.error("Variáveis de ambiente inválidas ou ausentes:");
  for (const issue of result.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const env = result.data;
