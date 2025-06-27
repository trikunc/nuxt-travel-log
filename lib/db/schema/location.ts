// import type { z } from "zod";

// import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
// import { fi } from "zod/v4/locales";

// import type { SelectLocationLog } from "./location-log";
// import { DescriptionSchema, LatSchema, LongSchema, NameSchema } from "../../zod-schemas";
import { user } from "./auth";
// import { locationLog } from "./location-log";

export const location = sqliteTable("location", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text(),
  lat: real().notNull(),
  long: real().notNull(),
  userId: int().notNull().references(() => user.id, { onDelete: "cascade" }),
  createdAt: int().notNull().$default(() => Date.now()),
  updatedAt: int().notNull().$default(() => Date.now()).$onUpdate(() => Date.now()),
// }, t => [
//   unique().on(t.name, t.userId),
// ]);
});

// export const locationRelations = relations(location, ({ many }) => ({
//   locationLogs: many(locationLog),
// }));

export const InsertLocation = createInsertSchema(location, {
  // name: NameSchema,
  // description: DescriptionSchema,
  // lat: LatSchema,
  // long: LongSchema,
  name: field => field.min(1).max(100),
  description: field => field.max(1000),
  lat: field => field.min(-90).max(90),
  long: field => field.min(-180).max(180),
}).omit({
  id: true,
  slug: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

// export type InsertLocation = z.infer<typeof InsertLocation>;
// export type SelectLocation = typeof location.$inferSelect;
// export type SelectLocationWithLogs = SelectLocation & {
//   locationLogs: SelectLocationLog[];
// };
