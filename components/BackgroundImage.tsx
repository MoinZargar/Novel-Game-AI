"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { BackgroundImageProps } from "@/lib/types/game-scene"

export function BackgroundImage({ src, alt = "Background image", isLoading }: BackgroundImageProps) {
    
    useEffect(() => {
        if (src) {
            const img = new window.Image()
            img.src = src
        }
    }, [src])
    
    if (src) {
        return (
            <div className="absolute inset-0 w-full h-full">
                <Image 
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover w-full h-full"
                    priority
                />
            </div>
        )
    }
    
    if (isLoading) {
        return (
            <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <div className="text-white text-center">
                        <div className="mb-3">
                            <svg className="animate-spin h-8 w-8 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                        <p className="text-lg font-medium">Generating image...</p>
                    </div>
                </div>
            </div>
        )
    }
    
    // Case 3: Default - no image and not loading
    return (
        <div className="absolute inset-0 w-full h-full">
            <div className="w-full h-full bg-slate-800" />
        </div>
    )
}