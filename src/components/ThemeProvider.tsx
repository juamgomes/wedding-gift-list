"use client"
import { useEffect, useState } from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Verifica se o componente está no lado do cliente (após a montagem)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Se não estiver montado (o que significa que ainda está no lado do servidor), 
  // retorna um fragmento vazio para evitar a discrepância na renderização
  if (!mounted) {
    return <>{children}</>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
