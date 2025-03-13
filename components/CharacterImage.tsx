"use client"
import { CharacterImageProps } from "@/lib/types/game-scene"

export function CharacterImage({ src, alt = "Character" }: CharacterImageProps) {

  if (src) {

    return (
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center justify-center">
          <span className="text-7xl" role="img" aria-label={alt}>
            {src}
          </span>
        </div>
      </div>
    )
  }

  
  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-16 h-20 bg-peach-300 rounded-full flex items-center justify-center z-10">
      <div className="w-10 h-10 rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-black rounded-full absolute" style={{ top: "40%", left: "38%" }}></div>
        <div className="w-1.5 h-1.5 bg-black rounded-full absolute" style={{ top: "40%", right: "38%" }}></div>
        <div className="w-6 h-3 border-b-2 border-black rounded-b-full absolute" style={{ top: "50%" }}></div>
      </div>
    </div>
  )
}

