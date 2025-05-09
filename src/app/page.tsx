import GiftCard from "@/components/GiftCard";
import Header from "@/components/Header";
// Dados de exemplo para os presentes
// https://drive.google.com/file/d/1TmxcHpmsP6gTp2OlffIoa9V5JSp6WGEb/view?usp=drive_link
const gifts = [
  {
    id: 1,
    name: "Sanduicheira",
    price: "R$ 180",
    description: "Sanduicheira elétrica para lanches rápidos e saborosos.",
    image:
      "https://drive.google.com/uc?export=view&id=1E4lv88GkBW0my8jyoLdrgxhR1QX14-vY" ,
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 2,
    name: "Panela de Arroz Elétrica",
    price: "R$ 160",
    description: "Panela elétrica para preparar arroz perfeito.",
    image: "https://drive.google.com/uc?export=view&id=1Ae8t8V6DsP_7EvwI3Nf2u_8kKNlTc6cs",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 3,
    name: "Mixer",
    price: "R$ 190",
    description: "Mixer potente para preparar smoothies e sopas.",
    image: "https://drive.google.com/uc?export=view&id=1e6_prBXwq3gGg_a3pT6b3gOuKxAMpPwl",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 4,
    name: "Liquidificador",
    price: "R$ 200",
    description: "Liquidificador potente para preparar sucos e vitaminas.",
    image: "https://drive.google.com/uc?export=view&id=1wVMu8TCYxjXpSh3VJF0Fq3uHfEpxxRjZ",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 5,
    name: "Ferro de Passar Roupa",
    price: "R$ 170",
    description: "Ferro de passar roupa a vapor para deixar as roupas impecáveis.",
    image: "https://drive.google.com/uc?export=view&id=1rcUcBS0ep8FSMVgR1_I1B3ddEeY0yNQ0",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 6,
    name: "Chaleira Elétrica",
    price: "R$ 140",
    description: "Chaleira elétrica para preparar chás e infusões rapidamente.",
    image: "https://drive.google.com/uc?export=view&id=1vUrQ2C5MRwZZIVbAfZ-IojFBnCs_HdH3",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  },
  {
    id: 7,
    name: "Cafeteira Elétrica",
    price: "R$ 250",
    description: "Cafeteira elétrica para preparar café fresco e saboroso.",
    image: "https://drive.google.com/uc?export=view&id=1TmxcHpmsP6gTp2OlffIoa9V5JSp6WGEb",
    price_id: "price_1RMkI2I0PMy4Q2PtHHq2Ca81",
  }
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
