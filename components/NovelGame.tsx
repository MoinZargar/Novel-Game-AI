"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { actionSchema } from "@/lib/validation/action-schema"
import type { ActionType } from "@/lib/types/forms"
import type { NarrativeInput } from "@/lib/types/narrative"
import { GameScene } from "@/components/GameScene"
import axios from "axios"
import { set } from "zod"

export function NovelGame() {
    const [context, setContext] = useState<NarrativeInput[]>([])
    const [narrative, setNarrative] = useState<string>("")
    const [backgroundImage, setBackgroundImage] = useState<string>("")
    const [character, setCharacter] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<ActionType>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            action: "",
        },
    })

    const onSubmit = async (data: ActionType) => {
        try {
            setLoading(true)
            setError(null)
            const input = { ...data, context }

            // Generate narrative based on the action
            const response = await axios.post("/api/generate/narrative", input)
            const narrativeResponse = response.data.response
            setNarrative(narrativeResponse?.narrative)
            console.log(narrativeResponse)

            //   // if there is need to update the background image
            if (narrativeResponse?.backgroundUpdate) {
                const imageResponse = await axios.post("/api/generate/image", data)
                const imageURL = imageResponse.data.imageURL
                setBackgroundImage(imageURL)
            }

            // if there is need to update the character
            if (narrativeResponse?.characterUpdate) {
                const response = await axios.post("/api/generate/emoji", data)
                const characterResponse = response.data.response
                const character = characterResponse?.data?.emojis[0]
                setCharacter(character)

            }

            setContext((prev) => [...prev, { role: "user", parts: [{ text: data.action }] }])
            setError(null)
        }
        catch (error: any) {
            console.log(error)
            const message = error?.response?.data?.error || " Something went wrong"
            setError(message)

        } finally {
            form.reset()
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col h-full border rounded-lg overflow-hidden shadow-md">
            {/* Background Image and Character Image container */}

            <div className="flex-grow">
                {error ? (
                    <div className="flex items-center justify-center h-full bg-red-50 p-4">
                        <div className="text-red-600 text-center">
                            <p className="text-xl font-semibold mb-2">Error</p>
                            <p>{error}</p>
                        </div>
                    </div>
                ) : (
                    <GameScene backgroundSrc={backgroundImage} character={character} isLoading={loading} />
                )}
            </div>

            {/* Narrative text container */}
            <div className="bg-gray-100 p-4 border-t overflow-y-auto flex-shrink-0 max-h-[60%]">
                <p className="text-gray-800">{narrative}</p>
            </div>

            {/* Action form container */}
            <div className="p-3 bg-white border-t border-gray-500 flex-shrink-0">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-x-2">
                        <FormField
                            control={form.control}
                            name="action"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input placeholder="Type your next action..." {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={loading} className="flex-shrink-0 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading...
                                </div>
                            ) : (
                                "Send"
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}