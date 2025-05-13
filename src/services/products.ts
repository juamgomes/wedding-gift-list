import axios from "axios";
import Papa from "papaparse";

export interface IGift {
  _id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

const http_products = axios.create({
  baseURL:
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHqZ2kwy0z1XdrSVJpSPu9Q7tEOL1TCiRiIATdzdtrwh6CuRK2OMtOZK_mg_UHZ9pCP7-bVMGwnmOy/pub?gid=0&single=true&output=csv",
});

// export async function fetchGifts(): Promise<IGift[]> {
//   try {
//     const response = await http_products.get("", { responseType: "text" });
//     let csvData = response.data;


//     const lines = csvData.split('\n');

//     while (lines.length > 0) {
//       const firstLineTrimmed = lines[0].trim();
//       if (firstLineTrimmed === '' || /^[,\s]*$/.test(firstLineTrimmed)) { 
//         lines.shift(); 
//       } else {
//         break; 
//       }
//     }
//     csvData = lines.join('\n');

//     const parsedData = Papa.parse<any>(csvData, {
//       header: true,
//       skipEmptyLines: true, 
//       dynamicTyping: true,
//     });

//     if (parsedData.errors && parsedData.errors.length > 0) {
//       console.error("Erros de parsing do CSV (fora do complete):", parsedData.errors);
//     }

//     console.log("🚀 ~ fetchGifts ~ parsedData.data (antes do map):", parsedData.data);

//     if (!Array.isArray(parsedData.data)) {
//         console.error("parsedData.data não é um array. Conteúdo:", parsedData.data);
//         return [];
//     }

//     const gifts: IGift[] = parsedData.data.map((item: any, index: number) => {
//       if (index === 0) {
//         console.log("Primeiro item do CSV (objeto ANTES do map, após parse):", item);
//         console.log("Chaves do primeiro item:", Object.keys(item)); // Verifique se são 'id', 'name', etc.
//       }
//       return {
//         id: item.id !== undefined && item.id !== null ? Number(item.id) : 0,
//         name: item.name || "Sem nome",
//         price: item.price !== undefined && item.price !== null ? `R$ ${item.price}` : "R$ 0",
//         description: item.description || "Sem descrição",
//         image: item.image || "",
//       };
//     })
//     .filter(gift => gift.id !== 0 || gift.name !== "Sem nome" || gift.description !== "Sem descrição");

//     return gifts;
//   } catch (error) {
//     console.error("Erro ao buscar produtos:", error);
//     if (axios.isAxiosError(error)) {
//         console.error("Detalhes do erro Axios:", error.response?.data, error.response?.status, error.message);
//     }
//     return [];
//   }
// }