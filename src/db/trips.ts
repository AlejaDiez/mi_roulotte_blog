import { sql } from "drizzle-orm";
import { integer, sqliteTable as table, text } from "drizzle-orm/sqlite-core";

export const TripsTable = table("trips", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    date: integer("date", { mode: "timestamp" }).notNull(),
    title: text("title").notNull(),
    description: text("description"),
    image: text("image"),
    video: text("video"),
    content: text("content", { mode: "json" }).notNull(),
    keywords: text("keywords", { mode: "json" }),
    published: integer("published", { mode: "boolean" }).notNull().default(false),
    allowComments: integer("allow_comments", { mode: "boolean" }).notNull().default(false),
    createdAt: integer("created_at", { mode: "timestamp" })
        .notNull()
        .default(sql`(unixepoch())`),
    updatedAt: integer("updated_at", { mode: "timestamp" })
});
