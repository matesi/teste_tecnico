CREATE TABLE IF NOT EXISTS "measure" (
	"id" text PRIMARY KEY NOT NULL,
	"image_post" text NOT NULL,
	"image_url" text,
	"customer_code" text NOT NULL,
	"measure_value" integer,
	"measure_datetime" timestamp with time zone,
	"measure_type" text NOT NULL
);
