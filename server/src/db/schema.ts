import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'
import { integer } from 'drizzle-orm/pg-core'

export const measure = pgTable('measure', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  imagePost: text('image_post').notNull(),
  imageUrl: text('image_url'),
  customerCode: text('customer_code').notNull(),
  measureValue: integer('measure_value'),
  measureDatetime: timestamp('measure_datetime', { withTimezone: true })
  .defaultNow()
  .notNull(),
  measureType: text('measure_type').notNull(),
})