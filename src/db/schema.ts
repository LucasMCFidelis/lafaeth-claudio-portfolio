import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  birthDate: date("birth_date"),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const accountTable = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verificationTable = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const imagesTable = pgTable("images", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  artist: text("artist").notNull(),
  screenwriter: text("screenwriter"),
  colorist: text("colorist"),
  horizontalPage: boolean("horizontal_page").notNull().default(false),
  visibleInHome: boolean("visible_in_home").notNull().default(false),
  index: integer("index"),
  createdAt: date("created_at").defaultNow().notNull(),
});

export const flatTable = pgTable("flat", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  frontImageId: uuid("front_image_id").references(() => imagesTable.id, {
    onDelete: "set null",
  }),
  backImageId: uuid("back_image_id").references(() => imagesTable.id, {
    onDelete: "set null",
  }),
  visibleInFlat: boolean("visible_in_flat").notNull().default(false),
  index: integer("index"),
});

export const flatRelations = relations(flatTable, ({ one }) => ({
  frontImage: one(imagesTable, {
    fields: [flatTable.frontImageId],
    references: [imagesTable.id],
  }),
  backImage: one(imagesTable, {
    fields: [flatTable.backImageId],
    references: [imagesTable.id],
  }),
}));

export const comicsTable = pgTable("comic", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageId: uuid("image_id").references(() => imagesTable.id, {
    onDelete: "set null",
  }),
  productionYear: integer("production_year")
    .notNull()
    .default(new Date().getFullYear()),
  productionSizePages: integer("production_size_pages").notNull(),
  visibleInComics: boolean("visible_in_comics").notNull().default(false),
  index: integer("index"),
});

export const comicsRelations = relations(comicsTable, ({ one }) => ({
  image: one(imagesTable, {
    fields: [comicsTable.imageId],
    references: [imagesTable.id],
  }),
}));

export const colorizationTable = pgTable("colorization", {
  id: uuid("id").primaryKey().defaultRandom(),
  imageId: uuid("image_id").references(() => imagesTable.id, {
    onDelete: "set null",
  }),
  productionYear: integer("production_year")
    .notNull()
    .default(new Date().getFullYear()),
    observations: text("observations"),
  visibleInColorization: boolean("visible_in_colorization")
    .notNull()
    .default(false),
  index: integer("index"),
});

export const colorizationRelations = relations(
  colorizationTable,
  ({ one }) => ({
    image: one(imagesTable, {
      fields: [colorizationTable.imageId],
      references: [imagesTable.id],
    }),
  })
);
