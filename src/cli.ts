import { memoize } from "./memoize";
import readline from "readline"

function fibonacci(n: number): number {
    if (n <= 1) {
      return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
  
  const memoizedFibonacci = memoize(fibonacci);
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  function calculateFibonacci(n: number) {
    const start = process.hrtime();
    const result = memoizedFibonacci(n);
    const end = process.hrtime(start);
    const timeTaken = end[0] * 1000 + end[1] / 1000000; // Convert to milliseconds
    return { result, timeTaken };
  }
  
  function processInput(input: string) {
    const n = parseInt(input.trim(), 10);
    if (isNaN(n)) {
      console.log('Invalid number. Please enter a valid integer.');
    } else {
      const { result, timeTaken } = calculateFibonacci(n);
      console.log(`Fibonacci(${n}) = ${result}, calculated in ${timeTaken.toFixed(2)} ms`);
    }
    rl.prompt();
  }
  
  rl.setPrompt('Enter a number to calculate Fibonacci (Ctrl+C to exit): ');
  rl.prompt();
  
  rl.on('line', (input: string) => {
    processInput(input);
  });