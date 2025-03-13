import { generateNarrative } from "@/lib/narrative-ai";
import { actionSchema } from "@/lib/validation/action-schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
    try {
        const { action, context } = await request.json();
        // Validate the action
        const result = actionSchema.safeParse({ action });
        if (!result.success) {
            throw new Error('Invalid action');
        }
        const response = await generateNarrative(action, context);
        return NextResponse.json({
            response,
        }, { status: 200 });
    } catch (error: any) {
        console.log(error.stack);
        return NextResponse.json(
            {
                error: error?.message || 'Something went wrong while generating the narrative.',
            },
            { status: 500 }
        );
    }
}