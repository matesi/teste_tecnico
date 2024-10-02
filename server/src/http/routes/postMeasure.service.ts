import zod from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { GetTextFromImageGemini } from './gemini/geminiConsult.service';
import { ProccessMeasure } from './postMeasure.controller';
import { measure } from '../../db/schema';
import { error } from 'console';

export const measureRoute: FastifyPluginAsyncZod = async app => {
    app.post(
      '/upload',
      {
        schema: {
          body: zod.object({
            image: zod.string({
              required_error: "Image é obrigatório",
              invalid_type_error: "Image deve ser do tipo texto",
            }),
            customer_code: zod.string({
              required_error: "Customer Code é obrigatório",
              invalid_type_error: "Customer Code deve ser somente de números (texto)",
            }).regex(/[A-Za-z0-9]/,'Customer Code somente aceita conteúdo alfanumérico'),
            measure_datetime: zod.string({
              required_error: "Measure Datetime é obrigatório",
              invalid_type_error: "Measure Datetime deve ser do tipo texto",
            }).datetime("Measure Datetime deve ser no formato YYYY-MM-DDTHH:mm:ssZ"),
            measure_type: zod.string({
              required_error: "Measure Type é obrigatório",
              invalid_type_error: "Measure Type deve ser do tipo texto",
            }).regex(/(WATER|GAS)/, "Measure Type somente aceita os valores WATER|GAS"),
          }),
        },
      },
      async (request,reply) => {
        const body = request.body;
        const returnProcessMeasure = await ProccessMeasure(body);
        
        if(returnProcessMeasure.status === 200){
          return reply.status(returnProcessMeasure.status).send(
            {
                image_url: returnProcessMeasure.message.imageUrl,
                measure_value: returnProcessMeasure.message.measureValue,
                measure_uuid: returnProcessMeasure.message.id
            }
          );
        } else {
          return reply.status(returnProcessMeasure.status).send({
            error_code: returnProcessMeasure.status === 409 ? returnProcessMeasure.error_code : 'UNKNOWN_ERROR',
            error_description: returnProcessMeasure.message
          });
        }
      }
    );
  }
  