// handle.ts

import { Request, Response } from "express";
import { debounce, debounceHandler } from "../utils/debounce";
import { throttle, throttleHandler } from "../utils/throttle";



let debounceFullCount = 0;
let throttleFullCount = 0;

let debounceMixedCount = 0;
let throttleMixedCount = 0;
// Definimos debounceFullCount para asegurarnos de que está disponible
// Variable para almacenar el temporizador de debounce
let debounceTimer: NodeJS.Timeout | null = null;

const increment = () => {
    debounceFullCount++;
    console.log("debounceFullCount: ", debounceFullCount);
}

const debouncedIncrement = () => {
    if (debounceTimer) {
        clearTimeout(debounceTimer); // Limpiar temporizador anterior si existe
    }
    debounceTimer = setTimeout(() => {
        increment();
        debounceTimer = null; // Reiniciar temporizador después de completar
    }, 2100);
}

const list = () => {
    console.log("list num: ", debounceFullCount);
    return debounceFullCount;
}

export const handleDebounceFullCount = async (req: Request, res: Response) => {
    // Llamar al debounce
    debouncedIncrement();

    // Esperar un corto período antes de responder
    // await new Promise(resolve => setTimeout(resolve, 100));

    // Obtener el número actualizado desde list
    const actDebounceFullCount = list();
    console.log("actDebounceFullCount: ", actDebounceFullCount);
    res.json({ message: 'Debounce count incremented', count: actDebounceFullCount+1 });
};
export const incrementDebounceFullCount = debounce(handleDebounceFullCount,2000)

export const incrementThrottleFullCount = (req: Request, res: Response) => {
  throttleFullCount++;
// throttle(()=>throttleFullCount++, 2000)
// setTimeout(() => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleFullCount }));
// }, 2100);
res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleFullCount }));
  
};





export const incrementDebounceMixedCount = (req: Request, res: Response) => {
  // debounceMixedCount++;
debounce(()=>debounceMixedCount++, 2000)
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Debounce count incremented', count: debounceMixedCount }));
  }, 2100);
    // res.writeHead(200, { 'Content-Type': 'application/json' });
    // res.end(JSON.stringify({ message: 'Debounce count incremented', count: debounceMixedCount }));
};
export const incrementThrottleMixedCount = (req: Request, res: Response) => {
  // throttleMixedCount++;
throttle(()=>throttleMixedCount++, 2000)
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleMixedCount }));
  }, 2100);
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleMixedCount }));
};
//"working example"
export const goodDebouncedFullIncrement = debounceHandler(incrementDebounceFullCount, 2000)
export const goodThrottleFullIncrement = throttleHandler(incrementThrottleFullCount, 2000)  



//'not working' example
// export const goodDebouncedMixedIncrement = debounce(incrementDebounceMixedCount, 2000);
// export const goodThrottledMixedIncrement = throttle(incrementThrottleMixedCount, 2000);
// export const goodDebouncedMixedIncrement = debounceHandler(incrementDebounceMixedCount, 2000)
// export const goodThrottledMixedIncrement = throttleHandler(incrementThrottleMixedCount, 2000)