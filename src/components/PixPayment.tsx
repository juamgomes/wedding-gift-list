"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Copy } from "lucide-react"
import { gerarQrCodePix } from "@/services/payments"

interface PixPaymentProps {
  onPaymentSuccess: () => void,
  pixCode: string,
  pixImage: string
}

export default function PixPayment({ onPaymentSuccess, pixCode, pixImage }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    setIsLoading(true)
    // Simulando verificação de pagamento
    setTimeout(() => {
      setIsLoading(false)
      onPaymentSuccess()
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="bg-white p-4 rounded-lg mx-auto w-48 h-48 relative mb-4">
          <Image
            src={pixImage || "/placeholder.svg?height=200&width=200&text=QR+Code"}
            alt="QR Code PIX"
            fill
            className="object-contain"
            {...(pixImage?.startsWith('data:') ? {} : { unoptimized: true })}
          />
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Escaneie o QR Code acima com o aplicativo do seu banco ou copie e cole o código PIX abaixo
        </p>

        <div className="flex items-center space-x-2 mb-6">
          <Input value={pixCode} readOnly className="font-mono text-xs text-black" />
          <Button variant="outline" size="icon" onClick={handleCopyCode} className="flex-shrink-0">
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {copied && (
          <p className="text-green-600 text-sm mb-4">
            Código copiado para a área de transferência!
          </p>
        )}

        <div className="bg-rose-50 p-4 rounded-lg text-left mb-6">
          <h4 className="font-medium text-rose-800 mb-2">Instruções:</h4>
          <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
            <li>Abra o aplicativo do seu banco</li>
            <li>Escolha a opção de pagamento via PIX</li>
            <li>Escaneie o QR Code ou cole o código</li>
            <li>Confirme as informações e valor</li>
            <li>Conclua o pagamento</li>
          </ol>
        </div>

        <Button
          onClick={handleConfirmPayment}
          className="w-full bg-rose-600 hover:bg-rose-700"
          disabled={isLoading}
        >
          {isLoading ? "Verificando..." : "Já realizei o pagamento"}
        </Button>
      </div>
    </div>
  )
}
