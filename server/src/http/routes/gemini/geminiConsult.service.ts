import { GoogleGenerativeAI } from "@google/generative-ai";
import { key, model } from './geminiEnv';
import { stat } from "fs";

const genAi = new GoogleGenerativeAI(key.API_KEY);

const fileToGenerativePart = async (imageBase64: string, mimeType: string) => {
    imageBase64 = imageBase64.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, "");
    return {
        inlineData: {
          data: Buffer.from(imageBase64, "base64").toString("base64"),
          mimeType,
        },
      };
};

export const GetTextFromImageGemini = async (sendedData: any) => {
    const modelAi = genAi.getGenerativeModel({
        model: model.MODEL_GEMINI});

    let prompt = "";
    
    if(sendedData.measure_type === 'WATER'){
        prompt = "describe the numbers on the water meter on the image.";
    }else if(sendedData.measure_type === 'GAS'){
        prompt = "describe the numbers on the gas meter on the image.";
    }
    
    const imagePart:any = await fileToGenerativePart(
    sendedData.image,
    "image/jpeg",
    );

    const searchResult = await modelAi.generateContent([prompt, imagePart]);
    const statusMessage = searchResult.response.text();
    let statusCode = 200;

    if(statusMessage.search(/numbers/gi) === -1){
        statusCode = 400;
    }
    
    //return searchResult.response.text();
    return {
        status: statusCode,
        message: statusMessage
    };
}