import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import { defineConfig } from "prisma/config";

console.log("DB URL:", process.env.DATABASE_URL); // debug

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});