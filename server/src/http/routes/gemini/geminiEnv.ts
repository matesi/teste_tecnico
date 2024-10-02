import zod from 'zod';

const envEnvKey = zod.object({
    GEMINI_API_KEY: zod.string(),
});
export const key = envEnvKey.parse(process.env);

const envModel = zod.object({
    MODEL_GEMINI: zod.string(),
});
export const model = envModel.parse(process.env)