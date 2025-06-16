'use client';
import { set } from "mongoose";
import { useState } from "react";

export default function ConfirmPage() {
  const [form, setForm] = useState({ name: "", guests: 1, attending: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function redirectToHome() {
    window.location.href = "/";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/confirm-presence", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao confirmar presença");
        }

        setSubmitted(true);

        setTimeout(() => {
          redirectToHome();
        }, 3000);
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao enviar confirmação:", error);
      });
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-rose-600 text-white">
        <h1 className="text-3xl font-bold mb-4">Obrigado pela confirmação!</h1>
        <p>Estamos ansiosos para celebrar com você, {form.name}!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-rose-600 mb-4 text-center">
          Confirmação de Presença
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Confirme sua presença no casamento de Juan & Poliana
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-rose-600 font-semibold mb-1" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-rose-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>
          <div>
            <label className="block text-rose-600 font-semibold mb-1" htmlFor="guests">
              Quantidade de convidados (incluindo você)
            </label>
            <input
              id="guests"
              name="guests"
              type="number"
              min={1}
              max={10}
              required
              value={form.guests}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-rose-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-600"
            />
          </div>
          <div>
            <label className="block text-rose-600 font-semibold mb-1" htmlFor="attending">
              Você irá comparecer?
            </label>
            <select
              id="attending"
              name="attending"
              required
              value={form.attending}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-rose-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-600"
            >
              <option value="">Selecione</option>
              <option value="Sim">Sim, vou!</option>
              <option value="Não">Não poderei ir</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded transition-colors"
          >
            Confirmar Presença
          </button>
        </form>
      </div>
    </div>
  );
}