import { pgTable, text, timestamp,integer } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const measure = pgTable('measure', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  imagePost: text('image_post').notNull(),
  imageUrl: text('image_url'),
  customerCode: text('customer_code').notNull(),
  measureValue: integer('measure_value'),
  measure_datetime: timestamp('measure_datetime')
  .notNull(),
  measureType: text('measure_type').notNull(),
});