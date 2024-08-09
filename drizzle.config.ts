import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: 'configs/schema.ts',
  out: './drizzle',
  dialect:'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:qOfEghx43Hud@ep-bitter-hill-a5kqglbw.us-east-2.aws.neon.tech/ai-form?sslmode=require',
  },
});
