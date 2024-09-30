import zod from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const measureRoute: FastifyPluginAsyncZod = async app => {
    app.post(
      '/measure',
      {
        schema: {
          body: zod.object({
            image: zod.string(),
            customer_code: zod.string(),
            measure_datetime: zod.string(),
            measure_type: zod.string(),
          }),
        },
      },
      async request => {
        const body = request.body;
  
        console.log(body);
  
        return {
          success: true,};
      }
    );
  }
  