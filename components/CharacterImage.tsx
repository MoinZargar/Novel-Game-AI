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

}

