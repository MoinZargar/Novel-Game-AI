import { narrativeModel , generationConfig } from "./config/narrative-ai";
import { NarrativeInput, NarrativeResponse } from "./types/narrative";


export async function generateNarrative(action: string, context:NarrativeInput):Promise<NarrativeResponse> {
  try {
    const Session = narrativeModel.startChat({
      generationConfig,
      history: Array.isArray(context) ? context : [context],
    });
    
    const result = await Session.sendMessage(action);
    const textResponse = result.response.text();
    const response:NarrativeResponse = JSON.parse(textResponse);
    return response; 
    }
  catch (error:any) {
    throw new Error(error?.response?.data?.message || "An error occurred while generating narrative");
  }
}