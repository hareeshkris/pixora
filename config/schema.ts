import { date, integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  credits: integer().default(10),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const projectsTable = pgTable('projects',{
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   projectId:varchar().notNull(),
   userInput:varchar(),
   device:varchar(),
   createdOn:date().defaultNow(),
   config:json(),
  userId:varchar().references(()=>usersTable.email).notNull()
})