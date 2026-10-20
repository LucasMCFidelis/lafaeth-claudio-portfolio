import "server-only";

import { and, inArray, sql } from "drizzle-orm";
import { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

import { db } from "@/db";

interface UpdateDisplayOrderItemsProps<
  T extends { id: string; index: number | null }
> {
  table: PgTable;
  items: Array<T>;
}

/**
 * Saves the position of each item as its `index`, in a single statement.
 * If any id does not exist (or is repeated), nothing is updated and it throws.
 */
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

  if (items.length === 0) return;

  const ids = items.map((item) => item.id);
  const newIndex = sql.join(
    [
      sql`CASE`,
      ...items.map((item, i) => sql`WHEN ${id} = ${item.id} THEN ${i}::integer`),
      sql`END`,
    ],
    sql` `
  );

  const updated = await db
    .update(table)
    .set({ index: newIndex })
    .where(
      and(
        inArray(id, ids),
        // Only update when every id exists, so a bad list changes nothing.
        sql`(SELECT count(*) FROM ${table} WHERE ${inArray(id, ids)}) = ${ids.length}`
      )
    )
    .returning({ id });

  if (updated.length !== items.length) {
    throw new Error(
      `Some items were not found in table ${table._.name}; order not saved`
    );
  }
};

export default updateDisplayOrderItems;
