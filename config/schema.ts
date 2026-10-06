import { date, integer, json, pgTable, text, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  credits: integer().default(10),
  email: varchar({ length: 255 }).notNull().unique(),
});


export const projectsTable = pgTable('projects',{
   id: integer().primaryKey().generatedAlwaysAsIdentity(),
   projectId: varchar().notNull().unique(),
   projectName:varchar(),
   theme:varchar(),
   userInput:varchar(),
   device:varchar(),
   projectVisualDescription:varchar(),
   createdOn:date().defaultNow(),
   config:json(),
  userId:varchar().references(()=>usersTable.email).notNull()
})

export const screenConfigTable = pgTable('screenConfig',{
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: varchar().references(() => projectsTable.projectId),
  screenId:varchar(),
  screenName:varchar(),
  purpose:varchar(),
  screenDescription:varchar(),
  code:text(),

})