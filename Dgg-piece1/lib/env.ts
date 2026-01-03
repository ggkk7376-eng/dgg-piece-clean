import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PAYLOAD_SECRET: z.string(),
    // DATABASE_URL: z.string(),
    VERCEL_READ_WRITE_TOKEN: z.string().optional(),
    SMTP_HOST: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
  },
  runtimeEnv: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    // DATABASE_URL: process.env.DATABASE_URL,
    VERCEL_READ_WRITE_TOKEN: process.env.VERCEL_READ_WRITE_TOKEN,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
  },
});
