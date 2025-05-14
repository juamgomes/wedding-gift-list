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
  } 
  
  else if (req.method === 'POST') {
    try {
      const { id, description, name, price, image } = req.body;
      const novoPresente = new ListadePresentes({ id, description, name, price, image });
      await novoPresente.save();
      res.status(201).json(novoPresente);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar o presente' });
    }
  } 
  
  else if(req.method === "PUT") {
    try {
      const { id, description, name, price, image } = req.body;
      const presenteAtualizado = await ListadePresentes.findByIdAndUpdate(id, { description, name, price, image }, { new: true });
      if (!presenteAtualizado) {
        return res.status(404).json({ error: 'Presente não encontrado' });
      }
      res.status(200).json(presenteAtualizado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o presente' });
    }
  } 
  
  else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'ID do presente é obrigatório' });
      }
      const presenteDeletado = await ListadePresentes.findByIdAndDelete(id);
      if (!presenteDeletado) {
        return res.status(404).json({ error: 'Presente não encontrado' });
      }
      res.status(200).json({ message: 'Presente deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar o presente' });
    }
  } 
  
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}