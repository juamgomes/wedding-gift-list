"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { gerarLinkDePagamento } from "@/services/payments";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);

  const giftName = searchParams.get("name") || "Presente";
  const giftPrice = searchParams.get("price") || "R$ 0,00";
  const giftImage =
    searchParams.get("image") || "/placeholder.svg?height=300&width=300";

  const convertPriceToIntCents = (price: string): number => {
    const numericValue = Number(price.replace("R$ ", "").replace(",", "."));
    return Math.round(numericValue * 100);
  };

  const handledLinkPaymentCreate = async () => {
    try {
      const payload = {
        is_building: false,
        payment_settings: {
          credit_card_settings: {
            installments: [
              {
                number: 1,
                total: Math.round(convertPriceToIntCents(giftPrice)),
              },
              {
                number: 2,
                total: Math.round(convertPriceToIntCents(giftPrice) / 2),
              },
              {
                number: 3,
                total: Math.round(convertPriceToIntCents(giftPrice) / 3),
              },
            ],
            operation_type: "auth_and_capture",
          },
          pix_settings: {
            expires_in: 3600,
          },
          accepted_payment_methods: ["credit_card", "pix"],
        },
        cart_settings: {
          items: [
            {
              amount: Math.round(convertPriceToIntCents(giftPrice)),
              name: giftName,
              default_quantity: 1,
            },
          ],
        },
        name: giftName,
        type: "order",
      };

      const response = await gerarLinkDePagamento(payload);

      setPaymentUrl(String(response.url));
    } catch (error) {
      console.error("Erro ao gerar link da pagina de checkout:", error);
    }
  };

  useEffect(() => {
    handledLinkPaymentCreate();
  }, []);

  if (paymentComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-rose-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-serif text-rose-800">
              Pagamento Confirmado!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Obrigado por presentear Maria & João
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-gray-700">
              Um e-mail de confirmação foi enviado com os detalhes da sua
              compra.
            </p>
            <p className="font-medium text-rose-700">
              {giftName} - {giftPrice}
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/" className="w-full">
              <Button className="w-full bg-rose-600 hover:bg-rose-700">
                Voltar para a Lista de Presentes
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center text-rose-700 hover:text-rose-800 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a Lista de Presentes
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resumo do Presente */}
          <div className="md:col-span-1">
            <Card className="sticky top-8 border-rose-200">
              <CardHeader>
                <CardTitle className="font-serif text-rose-800">
                  Resumo do Presente
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-48 w-full overflow-hidden rounded-md bg-rose-100 mb-4">
                  <Image
                    src={giftImage || "/placeholder.svg"}
                    alt={giftName}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-medium text-gray-800">{giftName}</h3>
                <p className="text-lg font-medium text-rose-600">{giftPrice}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{giftPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Frete:</span>
                    <span className="font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-800 font-medium">Total:</span>
                    <span className="font-bold text-rose-700">{giftPrice}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulário de Pagamento */}
          <div className="md:col-span-2">
            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle className="font-serif text-rose-800">
                  Pagamento
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Você será redirecionado para o site do nosso parceiro de
                  pagamentoss
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-hidden">
                {paymentUrl ? (
                  <iframe
                    src={paymentUrl}
                    className="w-full h-[600px] border-0"
                    title="Payment Portal"
                  />
                ) : (
                  <div className="p-6 text-center">
                    <p>Carregando página de pagamento...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
