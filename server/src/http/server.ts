import fastify from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import fastifyCors from '@fastify/cors';
import { measureRoute } from './routes/postMeasure.service';
import { getMeasureRoute } from './routes/getMeasure.service';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(measureRoute);
app.register(getMeasureRoute);

app
  .listen({
    port: 3335,
  })
  .then(() => {
    console.log('HTTP server running!')
  });
