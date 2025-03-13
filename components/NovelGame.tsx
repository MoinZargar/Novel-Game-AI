"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { actionSchema } from "@/lib/validation/action-schema"
import { ActionType } from "@/lib/types/forms"
import { NarrativeInput } from "@/lib/types/narrative"
import axios from "axios"
import { set } from "zod"

export function NovelGame() {
    const [context, setContext] = useState<NarrativeInput[]>([])
    const [backgroundImage, setBackgroundImage] = useState<string>("")
    const [character, setCharacter] = useState<string>("")
    const form = useForm<ActionType>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            action: "",
        },
    })

    const onSubmit = async (data: ActionType) => {
        try {
            const input = {...data, context}
            // Generate narrative based on the action
            const response = await axios.post("/api/generate/narrative", input)
            const narrativeResponse = response.data.response

            // if there is need to update the background image
            // if(narrativeResponse?.backgroundUpdate){
            //     const imageResponse = await axios.post("/api/generate/image", data)
            //     const imageURL = imageResponse.data.imageURL
            //     setBackgroundImage(imageURL)
            // }
            // if there is need to update the character
            if(narrativeResponse?.characterUpdate){
               const response = await axios.post("/api/generate/emoji", data)
               const characterResponse = response.data.response
               const character = characterResponse?.data?.emojis[0]
               console.log(character)
            }
            setContext((prev) => [...prev, { role: "user", parts: [{ text: data.action }] }])
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden shadow-md">

            <div className="p-2 bg-white border-t">
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
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                            Send
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

