import { RequestHandler } from "../../types";
import http from "http";

type FuncType = (...args: any[]) => void;

// export function throttle(func: FuncType, delay: number) {
//   let throttling = false;
//   return function(this: any, ...args: any[]) {
//     if (!throttling) {
//       func.apply(this, args);
//       throttling = true;
//       setTimeout(() => {
//         throttling = false;
//       }, delay);
//     }
//   };
// }
export function throttleHandler(handler: RequestHandler, wait: number): RequestHandler {
  const throttledFunction = throttle(handler, wait);
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    throttledFunction(req, res);
  };
}


// export function throttle(func: Function, wait: number) {
//   let timeout: NodeJS.Timeout | null = null;

//   return function(...args: any[]) {
//       if (!timeout) {
//           func(...args);
//           timeout = setTimeout(() => {
//               timeout = null;
//           }, wait);
//       }
//   };
// }

export function throttle(func: FuncType, delay: number) {
  let last = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - last < delay) return
    last = now;
    return func(...args);
  };
}


// NOT WORKS GOOD, WITH ERRORS!
// export function throttle(cb:Function, delay = 1000) {
//   let shouldWait = false
//   let waitingArgs:any
//   const timeoutFunc = () => {
//     if (waitingArgs == null) {
//       shouldWait = false
//     } else {
//       cb(...waitingArgs)
//       waitingArgs = null
//       setTimeout(timeoutFunc, delay)
//     }
//   }

//   return (...args:any) => {
//     if (shouldWait) {
//       waitingArgs = args
//       return
//     }

//     cb(...args)
//     shouldWait = true

//     setTimeout(timeoutFunc, delay)
//   }
// }
// export function throttle(func: Function, delay: number) {
//   let lastExecuted = 0;
//   return function(this: any, ...args: any[]) {
//     const now = Date.now();
//     if (now - lastExecuted > delay) {
//       func.apply(this, args);
//       lastExecuted = now;
//     }
//   };
// }




