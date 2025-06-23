import { connectToDatabase } from "@/lib/mongo";
import ConfirmcaoDePresenca from "@/models/ConfirmPresence";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    try {
      const { name, guests, attending } = req.body;
      const confirmou = new ConfirmcaoDePresenca({ name, guests, attending })
      await confirmou.save();
      res.status(201).json(confirmou);
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
    }
  } if (req.method === 'GET') {
    try {
      const confirmacoes = await ConfirmcaoDePresenca.find();
      res.status(200).json(confirmacoes);
    } catch (error) {
      console.error("Erro ao buscar confirmações de presença:", error);
      res.status(500).json({ error: "Erro ao buscar confirmações de presença" });
    }
  }
}