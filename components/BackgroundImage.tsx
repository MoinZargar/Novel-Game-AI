"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface BackgroundImageProps {
    src?: string
    alt?: string
}

export function BackgroundImage({ src, alt = "Background image" }: BackgroundImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    useEffect(() => {
        if (src) {
            const img = new window.Image()
            img.src = src
            img.onload = () => setImageLoaded(true)
        }
    }, [src])

    return (
        <div className="absolute inset-0 w-full h-full">
            {src && imageLoaded ? (
                <Image 
                    src={src || "/placeholder.svg"} 
                    alt={alt} 
                    fill 
                    className="object-cover w-full h-full" 
                    priority 
                />
            ) : (
                <div className="w-full h-full bg-slate-800" />
            )}
        </div>
    )
}
