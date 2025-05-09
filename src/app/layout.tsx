import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Lista de Presentes - Maria & João",
  description: "Lista de presentes para o casamento de Maria e João",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
          {children}
      </body>
    </html>
  )
}
