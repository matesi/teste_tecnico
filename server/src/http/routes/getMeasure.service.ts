import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const getMeasureRoute: FastifyPluginAsyncZod = async app => {
  app.get('/:idCustomer/list', async (request, reply) => {

    

    return { message: 'ok',
      params: request.params,
      querys: request.query
     };
  });
}