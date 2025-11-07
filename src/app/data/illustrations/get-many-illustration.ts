import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { illustrationsTable } from "@/db/schema";

import { OrderByCondition } from "../order-by-condition";
import { WhereCondition } from "../where-condition";
import { IllustrationDTO } from "./illustration-dto";
import mapToIllustrationDTO from "./map-to-illustration";

export interface GetManyIllustrationsProps<WithImage extends boolean> {
  where?: WhereCondition<typeof illustrationsTable>;
  orderBy?: OrderByCondition<typeof illustrationsTable>;
  withImage: WithImage;
}

const getManyIllustrations = async <WithImage extends boolean>({
  where,
  orderBy,
  withImage,
}: GetManyIllustrationsProps<WithImage>): Promise<
  Array<IllustrationDTO<WithImage>>
> => {
  const illustrations = await db.query.illustrationsTable.findMany({
    ...(where && { where: eq(illustrationsTable[where.field], where.value) }),
    ...(orderBy && {
      orderBy:
        orderBy.type === "desc"
          ? desc(illustrationsTable[orderBy.field])
          : asc(illustrationsTable[orderBy.field]),
    }),
    ...(withImage && { with: { image: true } }),
  });

  return illustrations.map((color) =>
    mapToIllustrationDTO({ data: color, withImage })
  );
};

export default getManyIllustrations;
