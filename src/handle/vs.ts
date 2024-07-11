// handle.ts

import { Request, Response } from "express";
import { debounce } from "../utils/debounce";
import { throttle } from "../utils/throttle";



let debounceFullCount = 0;
let throttleFullCount = 0;

let debounceMixedCount = 0;
let throttleMixedCount = 0;



const incrementDebounceFullCount = (req: Request, res: Response) => {
  debounceFullCount++;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Debounce count incremented', count: debounceFullCount }));
};

const incrementThrottleFullCount = (req: Request, res: Response) => {
  throttleFullCount++;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleFullCount }));
};

const incrementDebounceMixedCount = (req: Request, res: Response) => {
  debounceMixedCount++;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Debounce count incremented', count: debounceMixedCount }));
};
const incrementThrottleMixedCount = (req: Request, res: Response) => {
  throttleMixedCount++;
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Throttle count incremented', count: throttleMixedCount }));
};


export const badDebouncedFullIncrement = debounce(incrementDebounceFullCount, 2000);
export const badThrottledFullIncrement = throttle(incrementThrottleFullCount, 2000);
//'not working' example
export const badDebouncedMixedIncrement = debounce(incrementDebounceMixedCount, 2000);
export const badThrottledMixedIncrement = throttle(incrementThrottleMixedCount, 2000);
