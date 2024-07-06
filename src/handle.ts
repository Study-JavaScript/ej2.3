// handle.ts

import http from "http";
import { fetchPokemonData } from "./app";
import { debounceHandler } from "./utils/debounce";
import { memoize } from "./utils/memoize";

let offset = 0;
const limit = 10;

// Función para manejar la solicitud de Pokémon
const handleFetch = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    // Verificar si req.url está definido
    if (req.url) {
      const pageNo = parseInt(req.url.split("=")[1], 10) || 0; // Parsear el número de página
      offset = pageNo * limit;

      // Utilizar memoize para almacenar en caché los resultados
      const memoizedFetchPokemonData = memoize(fetchPokemonData);

      const startTime = Date.now();
      const data = await memoizedFetchPokemonData(offset, limit);
      const endTime = Date.now();

      const response = {
        from: offset + 1 - limit,
        to: offset + data.length,
        data,
        timeTaken: `${endTime - startTime} ms`,
      };

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing page parameter" }));
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Failed to fetch Pokémon data" }));
  }
};
// Aplicar debounce a la función de manejo de la solicitud
export const debouncedFetch = debounceHandler(handleFetch, 500);
