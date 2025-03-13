import { BackgroundImage } from "@/components/BackgroundImage"
// import { CharacterImage } from "./CharacterImage"
import { GameSceneProps } from "@/lib/types/game-scene"

export function GameScene({
  backgroundSrc,
  characterSrc,
}: GameSceneProps) {
  return (
    <div className="relative h-64 overflow-hidden rounded-t-lg">
      
      <div className="absolute inset-0 w-full h-full">
        <BackgroundImage src={backgroundSrc} alt="Background Image" />
      </div>

     
      {/* <CharacterImage src={characterSrc} alt="Character Image" /> */}
    </div>
  )
}

