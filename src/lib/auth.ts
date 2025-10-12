import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { db } from "@/db";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    modelName: "userTable",
    additionalFields: {
      description: { type: "string", required: false },
      behance: { type: "string", required: false },
      instagram: { type: "string", required: false },
      whatsappNumber: { type: "number", required: false },
      whatsappMessage: { type: "string", required: false },
      lattes: { type: "string", required: false },
      birthDate: { type: "date", required: false },
    },
  },
  session: {
    modelName: "sessionTable",
  },
  account: {
    modelName: "accountTable",
  },
  verification: {
    modelName: "verificationTable",
  },
});
