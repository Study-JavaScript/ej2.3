import { debounceHandler } from "../utils/debounce";
import { memoize } from "../utils/memoize";
import { fetchPokemonData } from "../app";
import { Request, Response } from "express";

// let offset = 0;
// const limit = 10;

// Función para manejar la solicitud de Pokémon
const handlePokemonRequest = async (req: Request, res: Response) => {
    try {
      const { pageNo } = req.body; // Obtener el número de página desde el cuerpo JSON
      const limit = 10;
      const offset = pageNo * limit;
  
      // Utilizar memoize para almacenar en caché los resultados
      const memoizedFetchPokemonData = memoize(fetchPokemonData);
  
      const startTime = Date.now();
      const data = await memoizedFetchPokemonData(offset, limit);
      const endTime = Date.now();
  
      const response = {
        from: offset + 1,
        to: offset + data.length,
        data,
        timeTaken: `${endTime - startTime} ms`,
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      res.status(500).json({ error: 'Failed to fetch Pokémon data' });
    }
  };
// Aplicar debounce a la función de manejo de la solicitud
export const debouncedFetch = debounceHandler(handlePokemonRequest, 500);
