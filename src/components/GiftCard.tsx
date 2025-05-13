import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"

interface Gift {
  _id: string
  name: string
  price: string
  description: string
  image: string
}

interface GiftCardProps {
  gift: Gift
}

export default function GiftCard({ gift }: GiftCardProps) {
  const paymentParams = new URLSearchParams({
    name: gift.name,
    price: gift.price,
    image: gift.image,
  }).toString()

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg border-rose-200 hover:border-rose-300">
      <div className="relative h-48 w-full overflow-hidden bg-rose-100">
        <Image
          src={gift.image || "/placeholder.svg"}
          alt={gift.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="font-serif text-rose-800">{gift.name}</CardTitle>
        <CardDescription className="text-lg font-medium text-rose-600">{gift.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{gift.description}</p>
      </CardContent>
      <CardFooter>
      <Link href={`/payment?${paymentParams}`} className="w-full">
          <Button className="w-full bg-rose-600 hover:bg-rose-700">
            <Heart className="mr-2 h-4 w-4" /> Presentear
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
