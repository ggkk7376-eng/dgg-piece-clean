import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PAYLOAD_SECRET: z.string(),
    // DATABASE_URL: z.string(),
    VERCEL_READ_WRITE_TOKEN: z.string().optional(),
  },
  runtimeEnv: {
    PAYLOAD_SECRET: process.env.PAYLOAD_SECRET,
    // DATABASE_URL: process.env.DATABASE_URL,
    VERCEL_READ_WRITE_TOKEN: process.env.VERCEL_READ_WRITE_TOKEN,
  },
});
