import { BackgroundImage } from "@/components/BackgroundImage"
import { CharacterImage } from "@/components/CharacterImage"
import type { GameSceneProps } from "@/lib/types/game-scene"

export function GameScene({ backgroundSrc, character , isLoading }: GameSceneProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0">
        <BackgroundImage src={backgroundSrc} alt="Background Image" isLoading={isLoading} />
      </div>

      <CharacterImage src={character} alt="Character Image" />
    </div>
  )
}

