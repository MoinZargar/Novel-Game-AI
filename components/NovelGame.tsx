"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { actionSchema } from "@/lib/validation/action-schema"
import { ActionType } from "@/lib/validation/types/forms"
import axios from "axios"

export function NovelGame() {

    const form = useForm<ActionType>({
        resolver: zodResolver(actionSchema),
        defaultValues: {
            action: "",
        },
    })

    const onSubmit = async (data: ActionType) => {
        console.log(data)
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

