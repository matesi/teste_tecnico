import dayjs from "dayjs";
import { db } from "../../db";
import { measure } from '../../db/schema';
import { eq, and, sql } from 'drizzle-orm'

interface DataMeasureRequest {
    customer_code: string,
    measure_type: string,
    measure_datetime: string
};

interface InsertDataMeasure{
    id?: string,
    image_post: string,
    customer_code: string,
    measure_datetime: string,
    measure_type: string,
    measure_value: number
}

export async function InsertMeasure(measureData: InsertDataMeasure) {
    const result = await db.insert(measure).values({
        imagePost: measureData.image_post,
        customerCode: measureData.customer_code,
        measure_datetime: sql /*sql*/ `TO_TIMESTAMP(${measureData.measure_datetime})`,
        measureType: measureData.measure_type,
        measureValue: measureData.measure_value
    }).returning();
    const getMeasureData = result[0];

    return {
        getMeasureData,
    };
}

export async function GetMeasureList(dataMeasure: DataMeasureRequest) {
    const result = await db
    .select({
        id: measure.id,
    })
    .from(measure)
    .where(
        and(
            eq(measure.customerCode, dataMeasure.customer_code),
            eq(measure.measureType, dataMeasure.measure_type),
            sql /*sql*/`DATE(measure.measure_datetime, 'MM') = DATE(${dataMeasure.measure_datetime}, 'MM')`
        )
    );

    return result;
}