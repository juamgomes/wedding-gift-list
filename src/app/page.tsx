import GiftCard from "@/components/GiftCard";
import Header from "@/components/Header";
// Dados de exemplo para os presentes
const gifts = [
  {
    id: 1,
    name: "Sanduicheira",
    price: "R$ 450,00",
    description: "Conjunto de porcelana com 24 peças para ocasiões especiais.",
    image:
      "https://drive.google.com/uc?export=view&id=1HgBSlIW3WUVawUKSSOd2eMlmODt02NzX",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 2,
    name: "Máquina de Café",
    price: "R$ 680,00",
    description: "Cafeteira automática para momentos especiais juntos.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 3,
    name: "Liquidificador",
    price: "R$ 250,00",
    description: "Liquidificador potente para preparar refeições deliciosas.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 4,
    name: "Jogo de Toalhas",
    price: "R$ 180,00",
    description: "Conjunto de toalhas macias e absorventes para o novo lar.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 5,
    name: "Panela Elétrica",
    price: "R$ 320,00",
    description: "Panela multifuncional para facilitar o dia a dia do casal.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 6,
    name: "Jogo de Lençóis",
    price: "R$ 290,00",
    description: "Lençóis de algodão egípcio para noites confortáveis.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 7,
    name: "Robô Aspirador",
    price: "R$ 1.200,00",
    description: "Para manter a casa limpa enquanto aproveitam o tempo juntos.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 8,
    name: "Kit de Taças",
    price: "R$ 220,00",
    description: "Conjunto de taças elegantes para brindar momentos especiais.",
    image: "/placeholder.svg?height=300&width=300",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header />

      <section className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-serif text-rose-800 mb-6">
          Nossa Lista de Presentes
        </h2>
        <p className="max-w-2xl mx-auto text-gray-700 mb-12">
          Agradecemos por fazer parte deste momento tão especial em nossas
          vidas. Sua presença é o nosso maior presente, mas se desejar nos
          presentear, selecionamos alguns itens que nos ajudarão a construir
          nosso novo lar.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <GiftCard key={gift.id} gift={gift} />
          ))}
        </div>
      </section>

      <footer className="bg-rose-100 py-8 text-center text-rose-800">
        <div className="container mx-auto px-4">
          <p className="font-serif text-xl mb-2">Juan & Poliana</p>
          <p className="text-sm">Casamento: 26 de Julho de 2025</p>
        </div>
      </footer>
    </main>
  );
}
