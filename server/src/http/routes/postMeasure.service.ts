import zod from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { GetTextFromImageGemini } from './gemini/geminiConsult.service';
import { stat } from 'fs';

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
        let statusCode = 200;
        let message = "Operação realizada com sucesso";        
        const returnGemini = await GetTextFromImageGemini(body);

        if(returnGemini.status !== 200){
          statusCode = returnGemini.status;
          message = returnGemini.message;
        }
  
        return reply.status(statusCode).send({
          status: statusCode,
          data: message});
      }
    );
  }
  