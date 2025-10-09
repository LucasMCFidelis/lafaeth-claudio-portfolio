import { SQLWrapper } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";

export type WhereCondition<T extends PgTable> = {
  field: keyof T["$inferSelect"];
  value: string | boolean | SQLWrapper;
};
