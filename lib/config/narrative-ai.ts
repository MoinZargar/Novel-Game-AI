import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  Schema,
  SchemaType,
  ObjectSchema,
  GenerationConfig
} from "@google/generative-ai";
import { generateNarrativePrompt } from "../prompt";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const narrativeModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction:generateNarrativePrompt
});


const responseSchema: ObjectSchema = {
  type: SchemaType.OBJECT,
  properties: {
    narrative: {
      type: SchemaType.STRING
    },
    backgroundUpdate: {
      type: SchemaType.BOOLEAN
    },
    characterUpdate: {
      type: SchemaType.BOOLEAN
    }
  },
  required: ["narrative", "backgroundUpdate", "characterUpdate"]
};


const generationConfig: GenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
  responseSchema: responseSchema
};

export { narrativeModel, generationConfig };