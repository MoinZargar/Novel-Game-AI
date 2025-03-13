import { NextRequest, NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { actionSchema } from '@/lib/validation/action-schema';
import { generateImagePrompt } from '@/lib/prompt';



export async function POST(request: NextRequest): Promise<Object> {
  try {

    const { action } = await request.json();
    // Validate the action
    const result = actionSchema.safeParse({ action });
    if (!result.success) {
      throw new Error('Invalid action');
    }
    const input = generateImagePrompt + action;

    const response = await fal.subscribe("fal-ai/flux/dev", {
      input: {
        prompt: input
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });
    const imageURL = response.data.images[0].url;
    return NextResponse.json({ 
        imageURL,
    }, { status: 200 });

  } catch (error: any) {
    console.log(error.stack);
    return NextResponse.json(
      {
        error: error?.message || 'Something went wrong while generating the image.',
      },
      { status: 500 }
    );
  }
}
