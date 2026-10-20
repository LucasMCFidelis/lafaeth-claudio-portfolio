import "server-only";

import { asc, desc, eq } from "drizzle-orm";
import { AnyPgColumn, PgTable } from "drizzle-orm/pg-core";

import { OrderByCondition } from "./order-by-condition";
import { WhereCondition } from "./where-condition";

const getColumn = (table: PgTable, field: PropertyKey) =>
  (table as unknown as Record<string, AnyPgColumn>)[field as string];

export const buildWhere = <T extends PgTable>(
  table: T,
  where?: WhereCondition<T>
) => (where ? eq(getColumn(table, where.field), where.value) : undefined);

export const buildOrderBy = <T extends PgTable>(
  table: T,
  orderBy?: OrderByCondition<T>
) => {
  if (!orderBy) return undefined;

  const column = getColumn(table, orderBy.field);
  return orderBy.type === "desc" ? desc(column) : asc(column);
};
