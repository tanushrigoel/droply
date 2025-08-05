import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),
  path: text("path").notNull(), // docu/pro/resume
  size: integer("size").notNull(),
  type: text("type").notNull(), // "folder"

  fileUrl: text("file_url").notNull(),
  thumbnailUrl: text("thumbnail_url"),

  // Ownership
  userId: text("user_id").notNull(),
  parentId: uuid("parent_id"), // parent folder id null for root

  // file/folder flags
  isFolder: boolean("is_folder").default(false).notNull(),
  isStarred: boolean("is_starred").default(false).notNull(),
  isTrash: boolean("is_trash").default(false).notNull(),

  // timestamps

  createdAt: timestamp("create_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// parent: each file / filder can have one parent folder
// children: each folder can have many child files/folders

export const filesRelations = relations(files, ({ one, many }) => ({
  parent: one(files, {
    fields: [files.parentId],
    references: [files.id],
  }),

  // relationship to child file/folder
  children: many(files),
}));

// defining type of file for typescript
export const File = typeof files.$inferSelect;
export const newFile = typeof files.$inferInsert;
