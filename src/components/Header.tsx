import Image from "next/image"
import { Button } from "./ui/Button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/eu_e_ela.jpg"
          alt="Casal de noivos"
          fill
          className="object-cover brightness-75"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="font-serif text-5xl md:text-6xl mb-4 drop-shadow-lg">Juan & Poliana</h1>
        <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
        <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto drop-shadow-md">
          Compartilhe a alegria do nosso amor neste dia especial
        </p>
        <p className="mt-6 text-lg font-serif">26 de Julho de 2025</p>

          <Button className="mt-10 bg-rose-600 hover:bg-rose-700">
              <Link href="/confirm">Confirmar presença</Link>
          </Button>
      </div>
    </header>
  )
}
