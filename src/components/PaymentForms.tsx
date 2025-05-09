"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";

interface PaymentFormProps {
  onPaymentSuccess: () => void;
}

export default function PaymentForm({ onPaymentSuccess }: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulando um processamento de pagamento
    setTimeout(() => {
      setIsLoading(false);
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            Informações do Cartão
          </h3>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="cardName">Nome no Cartão</Label>
              <Input
                id="cardName"
                placeholder="Nome como está no cartão"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cardNumber">Número do Cartão</Label>
              <Input
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Data de Validade</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" required className="mt-1" />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">
            Informações de Cobrança
          </h3>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="address">Endereço</Label>
              <Input
                id="address"
                placeholder="Rua, número"
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  placeholder="Cidade"
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="postalCode">CEP</Label>
                <Input
                  id="postalCode"
                  placeholder="00000-000"
                  required
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-rose-600 hover:bg-rose-700"
          disabled={isLoading}
        >
          {isLoading ? "Processando..." : "Finalizar Pagamento"}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          Seus dados de pagamento são processados de forma segura. Não
          armazenamos informações do seu cartão de crédito.
        </p>
      </div>
    </form>
  );
}
