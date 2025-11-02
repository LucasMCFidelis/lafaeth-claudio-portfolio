import "server-only";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { colorizationTable } from "@/db/schema";

import { WhereCondition } from "../where-condition";
import { ColorDTO } from "./colors-dto";
import mapToColorDTO from "./map-to-color";

export interface GetOneColorProps {
  where: WhereCondition<typeof colorizationTable>;
}

const getOneColor = async ({ where }: GetOneColorProps): Promise<ColorDTO> => {
  const color = await db.query.colorizationTable.findFirst({
    where: eq(colorizationTable[where.field], where.value),
    with: { image: true },
  });

  if (!color) throw new Error("Color not found");

  return mapToColorDTO({ data: color, withImage: true });
};

export default getOneColor;
