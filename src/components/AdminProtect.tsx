"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

interface AdminProtectionProps {
  onAuthenticate: () => void;
}

export function AdminProtection({ onAuthenticate }: AdminProtectionProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de autenticação - em um ambiente real, isso seria validado no servidor
    if (username === "admin" && password === "admin123") {
      onAuthenticate();
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-rose-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
            <ShieldAlert className="h-6 w-6 text-rose-600" />
          </div>
          <CardTitle className="text-2xl font-serif text-rose-800">
            Área Administrativa
          </CardTitle>
          <CardDescription>
            Faça login para gerenciar a lista de presentes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              Entrar
            </Button>
          </form>
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>Para fins de demonstração, use:</p>
            <p>
              Usuário: <span className="font-mono">admin</span>
            </p>
            <p>
              Senha: <span className="font-mono">admin123</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link
            href="/"
            className="text-sm text-rose-600 hover:underline"
          >
            Voltar para a lista de presentes
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
