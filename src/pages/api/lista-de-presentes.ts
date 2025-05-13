import { connectToDatabase } from "@/lib/mongo";
import ListadePresentes from "@/models/listaDePresentes";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const listaDePresentes = await ListadePresentes.find({});
      res.status(200).json(listaDePresentes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar a lista de presentes' });
    }
  } else if (req.method === 'POST') {
    try {
      const { id, description, name, price, image } = req.body;
      const novoPresente = new ListadePresentes({ id, description, name, price, image });
      await novoPresente.save();
      res.status(201).json(novoPresente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar o presente' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}