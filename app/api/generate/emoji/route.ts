import { generateCharacterPrompt } from "@/lib/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
    try {
        const { action } = await request.json();
        const input = generateCharacterPrompt + action;
        const apiKey = process.env.APIVERVE_EMOJI_KEY!;
        const apiEndpoint = process.env.APIVERVE_API_ENDPOINT!;
        
        if (!apiKey) {
            throw new Error('APIVERVE_API_KEY is not set');
        }

        const emojiResponse = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ text: input })
        }); 
        const response = await emojiResponse.json(); 

        return NextResponse.json({response}, { status: 200 });
    } catch (error:any) {
        console.error(error.stack);
        return NextResponse.json(
            {
              error: error.message || 'Something went wrong while generating the image.',
            },
            { status: 500 }
          );
    }
}