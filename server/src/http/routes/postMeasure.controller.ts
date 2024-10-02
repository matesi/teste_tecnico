import dayjs from 'dayjs'
import { GetMeasureList, InsertMeasure } from './postMeasure.model';
import { GetTextFromImageGemini } from './gemini/geminiConsult.service';
import { timestamp } from 'drizzle-orm/pg-core';

interface PostMeasureRequest {
    image: string
    customer_code: string,
    measure_datetime: string,
    measure_type: string
};

interface InsertDataMeasure{
    id?: string,
    image_post: string,
    customer_code: string,
    measure_datetime: string,
    measure_type: string,
    measure_value: number
};

export async function ProccessMeasure(request: PostMeasureRequest) {
    const insertMeasureData: InsertDataMeasure = {
        image_post: request.image,
        customer_code: request.customer_code,
        measure_datetime: request.measure_datetime,
        measure_type: request.measure_type,
        measure_value: 0
    };
    
    const verifyMeaseure = await GetMeasureList(request);

    if(verifyMeaseure.length > 0) {
        return {
            status: 409,
            error_code: "DOUBLE_REPORT",
            message: "Leitura do mês já realizada"
        };
    }
    
    const returnGemini = await GetTextFromImageGemini(request);
    let statusCode = 200;
    let message:any = "Operação realizada com sucesso";

    if(returnGemini.status === 200){
        message = await InsertMeasure(insertMeasureData);
    } else {
        statusCode = returnGemini.status;
        message = returnGemini.message;
    }
    
    return {
        status: statusCode,
        message: message
    };
}