import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { IllustrationDTO } from "./illustration-dto";
import mapToIllustrationDTO from "./map-to-illustration";

export interface GetOneIllustrationProps {
  where: WhereCondition<typeof illustrationsTable>;
}

const getOneIllustration = async ({
  where,
}: GetOneIllustrationProps): Promise<IllustrationDTO> => {
  const illustration = await db.query.illustrationsTable.findFirst({
    where: eq(illustrationsTable[where.field], where.value),
    with: { image: true },
  });

  if (!illustration) throw new Error("Illustration not found");

  return mapToIllustrationDTO({ data: illustration, withImage: true });
};

export default getOneIllustration;
