"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PlusCircle,
  Pencil,
  Trash2,
  ArrowLeft,
  ShieldAlert,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog";
import { AdminProtection } from "@/components/AdminProtect";
import { alertSuccess } from "@/lib/alerts";

interface Gift {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

interface Convidados {
  _id: string;
  name: string;
  guests: number;
  attending: boolean;
}

export default function AdminGiftsPage() {
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentGift, setCurrentGift] = useState<Gift | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [convidados, setConvidados] = useState<Convidados[]>([]);
  const router = useRouter();

  // Formulário para novo presente
  const [newGift, setNewGift] = useState<Omit<Gift, "_id">>({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleGetGifts = async () => {
    try {
      const response = await fetch("/api/lista-de-presentes");
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error("Erro ao buscar presentes:", error);
    }
  };

  useEffect(() => {
    handleGetGifts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewGift((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGift = async () => {
    try {
      await fetch("/api/lista-de-presentes", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: isEditing ? JSON.stringify({ ...newGift, id: currentGift?._id }) : JSON.stringify(newGift),
      });

      if (isEditing) {
        handleUpdateGift();
      }
      await handleGetGifts();
      setNewGift({
        name: "",
        price: "",
        description: "",
        image: "",
      });
      isEditing ? alertSuccess("Presente atualizado com sucesso!") : alertSuccess("Presente adicionado com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar presente:", error);
    }
  };

  const handleEditGift = (gift: Gift) => {
    setCurrentGift(gift);
    setNewGift({
      name: gift.name,
      price: gift.price,
      description: gift.description,
      image: gift.image,
    });
    setIsEditing(true);
    setDialogOpen(true);
  };

  const handleUpdateGift = async () => {
    if (!currentGift) return;

    await handleGetGifts();

    setIsEditing(false);
    setCurrentGift(null);
    setDialogOpen(false);
    setNewGift({
      name: "",
      price: "",
      description: "",
      image: "",
    });
  };

  const handleDeleteGift = async (_id: string) => {
    try {
      const response = await fetch(`/api/lista-de-presentes?id=${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        await handleGetGifts();
      } else {
        console.error("Erro ao deletar presente:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao deletar presente:", error);
    }
  };

  const handleGetConvidados = async () => {
    try {
      const response = await fetch("/api/confirm-presence");
      if (!response.ok) {
        throw new Error("Erro ao buscar convidados");
      }
      const data = await response.json();
      setConvidados(data);
    } catch (error) {
      console.error("Erro ao buscar convidados:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleGetConvidados();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <AdminProtection onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <header className="bg-white shadow-sm border-b border-rose-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="inline-flex items-center text-rose-700 hover:text-rose-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao site
            </Link>
            <h1 className="text-xl font-serif text-rose-800">
              Administração de Presentes
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 gap-4">
            <TabsTrigger value="list">Lista de Presentes</TabsTrigger>
            <TabsTrigger value="add">Adicionar Presente</TabsTrigger>
            <TabsTrigger value="cv">Convidados</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gifts.map((gift) => (
                <Card key={gift._id} className="border-rose-200">
                  <div className="relative h-48 w-full overflow-hidden bg-rose-100">
                    <Image
                      src={gift.image || "/placeholder.svg"}
                      alt={gift.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-serif text-rose-800">
                          {gift.name}
                        </CardTitle>
                        <CardDescription className="text-lg font-medium text-rose-600">
                          {gift.price}
                        </CardDescription>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditGift(gift)}
                          className="h-8 w-8 text-gray-500 hover:text-rose-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirmar exclusão
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o presente "
                                {gift.name}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteGift(gift._id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-2">
                      {gift.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {gifts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Nenhum presente cadastrado.</p>
                <Button
                  onClick={() => document.getElementById("add-tab")?.click()}
                  className="mt-4 bg-rose-600 hover:bg-rose-700"
                >
                  Adicionar Presente
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add">
            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle className="font-serif text-rose-800">
                  Novo Presente
                </CardTitle>
                <CardDescription>
                  Adicione um novo presente à lista de casamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddGift();
                  }}
                >
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do Presente</Label>
                      <Input
                        id="name"
                        name="name"
                        value={newGift.name}
                        onChange={handleInputChange}
                        placeholder="Ex: Jogo de Jantar"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="price">Preço</Label>
                      <Input
                        id="price"
                        name="price"
                        value={newGift.price}
                        onChange={handleInputChange}
                        placeholder="Ex: R$ 450,00"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="image">Coloque a url da imagem</Label>
                      <Input
                        id="image"
                        name="image"
                        value={newGift.image}
                        onChange={handleInputChange}
                        placeholder="Ex: https://example.com/image.jpg"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={newGift.description}
                        onChange={handleInputChange}
                        placeholder="Descreva o presente..."
                        rows={4}
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-600 hover:bg-rose-700"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Presente
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cv">
            <Card className="border-rose-200">
              <CardHeader>
                <CardTitle className="font-serif text-rose-800">
                  Convidados
                </CardTitle>
                <CardDescription>
                  Aqui você pode gerenciar os convidados do casamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nome
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Convidados
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Presença Confirmada
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {convidados.map((guest, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap">{guest.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap">{guest.guests}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {guest.attending ? "Sim" : "Não"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modal de edição */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="font-serif text-rose-800">
              Editar Presente
            </DialogTitle>
            <DialogDescription>
              Atualize as informações do presente selecionado.
            </DialogDescription>
          </DialogHeader>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddGift();
            }}
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Nome do Presente</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={newGift.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Jogo de Jantar"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-price">Preço</Label>
                <Input
                  id="edit-price"
                  name="price"
                  value={newGift.price}
                  onChange={handleInputChange}
                  placeholder="Ex: R$ 450,00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={newGift.description}
                  onChange={handleInputChange}
                  placeholder="Descreva o presente..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Coloque a url da imagem</Label>
                <Input
                  id="Image"
                  name="Imagem do Presente - url"
                  value={newGift.image}
                  onChange={handleInputChange}
                  placeholder="Ex: https://example.com/image.jpg"
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setIsEditing(false);
                  setCurrentGift(null);
                }}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-rose-600 hover:bg-rose-700">
                Salvar Alterações
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
