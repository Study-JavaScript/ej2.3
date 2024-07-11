import * as http from 'http';
import {RequestHandler} from "../../types"


// export function debounce<DebounceFunction extends (...args: any[])=>void>(func:DebounceFunction, wait: number): (...args: Parameters<DebounceFunction>)=>void{
//     let timeout: ReturnType<typeof setTimeout>;
//     return function(this:unknown, ...args: Parameters<DebounceFunction>){
        
//         clearTimeout(timeout);
//         timeout = setTimeout(() =>{
//             func.apply(this, args);
        
//         }, wait);
//     };

// }
export function debounce<DebounceFunction extends (...args: any[])=>void>(func:DebounceFunction, wait: number): (...args: Parameters<DebounceFunction>)=>void{
  let timeout: ReturnType<typeof setTimeout>;
  return function( ...args: Parameters<DebounceFunction>){
      
      clearTimeout(timeout);
      timeout = setTimeout(() =>{
          func(...args)
      
      }, wait);
  };

}
// export function debounce<DebounceFunction extends (...args: any[]) => void>(
//   func: DebounceFunction,
//   wait: number
// ): (...args: Parameters<DebounceFunction>) => void {
//   let timeout: ReturnType<typeof setTimeout> | null = null;
//   let lastArgs: Parameters<DebounceFunction> | null = null;

//   return function (...args: Parameters<DebounceFunction>) {
//     lastArgs = args;

//     if (timeout) {
//       clearTimeout(timeout);
//     }

//     timeout = setTimeout(() => {
//       if (lastArgs) {
//         func(...lastArgs);
//         lastArgs = null;
//       }
//     }, wait);
//   };
// }
export function debounceHandler(handler: RequestHandler, wait: number): RequestHandler {
  const debouncedFunction = debounce(handler, wait);
  return (req: http.IncomingMessage, res: http.ServerResponse) => {
    debouncedFunction(req, res);
  };
}