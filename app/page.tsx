import { NovelGame } from "@/components/NovelGame"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-5xl h-[80vh]">
        <NovelGame />
      </div>
    </main>
  )
}

