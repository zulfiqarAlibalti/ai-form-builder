import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:qOfEghx43Hud@ep-bitter-hill-a5kqglbw.us-east-2.aws.neon.tech/ai-form?sslmode=require');
export const db = drizzle(sql,{schema});

