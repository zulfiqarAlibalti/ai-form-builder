const { pgTable, serial, text, varchar, integer, boolean } = require("drizzle-orm/pg-core");

export const JsonForms=pgTable('jsonForms',{
    id:serial('id').primaryKey(),
    jsonform:text('jsonform').notNull(),
    theme:varchar('theme'),
    background:varchar('background'),
    style:varchar('style'),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    enabledSignIn:boolean('enabledSignIn').default(false)
})

export const userResponses=pgTable('userResponses',{
    id:serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    createdBy:varchar('createdBy').default('anonymus'),
    createdAt:varchar('createdAt').notNull(),
    formRef:integer('formRef').references(()=>JsonForms.id)
})

interface JsonForm {
    formTitle: string;
    formHeading: string;
    fields: Array<{
      fieldName: string;
      fieldType: string;
      label: string;
      placeholder: string;
      options?: Array<{ label: string }>;
      required?: boolean;
    }>;
  }
  