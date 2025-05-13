"use client";
import GiftCard from "@/components/GiftCard";
import Header from "@/components/Header";
import Loading from "@/components/ui/Loading";
import { IGift } from "@/services/products";
import { useEffect, useState } from "react";
// Dados de exemplo para os presentes
// https://drive.google.com/file/d/1TmxcHpmsP6gTp2OlffIoa9V5JSp6WGEb/view?usp=drive_link

export default function Home() {
  const [gifts, setGifts] = useState<IGift[]>([]);
  const [loading, setLoading] = useState(true);

  const getGifts = async () => {
    try {
      const response = await fetch("/api/lista-de-presentes");
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error("Erro ao buscar presentes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGifts();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Header />

      {!loading ? (
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
              <GiftCard key={gift._id} gift={gift} />
            ))}
          </div>
        </section>
      ) : (
        <Loading className="p-36"/>
      )}

      <footer className="bg-rose-100 py-8 text-center text-rose-800">
        <div className="container mx-auto px-4">
          <p className="font-serif text-xl mb-2">Juan & Poliana</p>
          <p className="text-sm">Casamento: 26 de Julho de 2025</p>
        </div>
      </footer>
    </main>
  );
}
