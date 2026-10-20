import "server-only";

import { eq } from "drizzle-orm";
import { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

import { db } from "@/db";

interface UpdateDisplayOrderItemsProps<
  T extends { id: string; index: number | null }
> {
  table: PgTable;
  items: Array<T>;
}

const updateDisplayOrderItems = async <
  T extends { id: string; index: number | null }
>({
  items,
  table,
}: UpdateDisplayOrderItemsProps<T>) => {
  const { id, index } = table as unknown as Record<
    string,
    AnyPgColumn | undefined
  >;

  if (!id || !index) {
    throw new Error(`Table ${table._.name} must have 'id' and 'index' columns`);
  }

  await db.transaction(async (tx) => {
    for (const [i, item] of items.entries()) {
      const updated = await tx
        .update(table)
        .set({ index: i })
        .where(eq(id, item.id))
        .returning({ id });
      // Throwing rolls back the whole transaction.
      if (updated.length === 0)
        throw new Error(`Item ${item.id} not found in table ${table._.name}`);
    }
  });
};

export default updateDisplayOrderItems;
