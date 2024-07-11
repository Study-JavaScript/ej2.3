import express from "express"
import path from "path"
import {  handleAddTask, handleCompleteTask, handleDeleteAllTasks, handleDeleteTask, handleGetGoodTasks } from "./handle/good-todo";
import { debouncedAddTask, debouncedCompleteTask, debouncedDeleteTask, handleGetBadTasks } from "./handle/bad-todo";
import { badDebouncedFullIncrement, badDebouncedMixedIncrement, badThrottledFullIncrement, badThrottledMixedIncrement } from "./handle/vs";
import { goodDebouncedFullIncrement, goodThrottleFullIncrement, incrementDebounceMixedCount, incrementThrottleMixedCount } from "./handle/wrong-vs";
import { debouncedFetch } from "./handle/memoize";

const rutas = express.Router();

// Obtener la ruta absoluta al directorio 'public'
const publicDirectory = path.resolve('public');

rutas.get('/',(req,res)=>{
    res.sendFile('index.html');
})

//TODO DEBOUNCE EXAMPLES
rutas.delete("/tasks/", handleDeleteAllTasks)
//GOOD DEBOUNCE
rutas.get("/todo-debounce",(req,res)=>{
    res.sendFile('todo-debounce.html',  { root: publicDirectory });
})

rutas.put("/tasks/:id/complete", handleCompleteTask)
rutas.delete("/tasks/:id", handleDeleteTask) 
rutas.post("/tasks/", handleAddTask)
rutas.get("/tasks/", handleGetGoodTasks)
//BAD DEBOUNCE
rutas.get("/todo-bad-debounce",(req, res)=>{
    res.sendFile('todo-bad-debounce.html', { root: publicDirectory });
})

rutas.put("/bad-tasks/:id/complete", debouncedCompleteTask)
rutas.delete("/bad-tasks/:id", debouncedDeleteTask)
rutas.post("/bad-tasks/", debouncedAddTask)
rutas.get("/bad-tasks/", handleGetBadTasks)

//VS EXAMPLES
//NORMAL VS
rutas.get("/vs",(req, res)=>{
    res.sendFile('vs.html', { root: publicDirectory });
})
// 'working' example
rutas.get("/debounce-full", badDebouncedFullIncrement)
rutas.get("/throttle-full", badThrottledFullIncrement)
// 'not-working' example
rutas.get("/debounce-wrong", badDebouncedMixedIncrement)
rutas.get("/throttle-wrong", badThrottledMixedIncrement)

//TEST VS
rutas.get("/vs-wrong",(req, res)=>{
    res.sendFile('vs-wrong.html', { root: publicDirectory });
})
//good counts
rutas.get("/wrong-debounce-full",goodDebouncedFullIncrement)
rutas.get("/wrong-throttle-full",goodThrottleFullIncrement)
//wrong counts
// en el wrong counts, intentamos aplicar la misma solución que en el debounce (todo-debounce), pero esto no funciona
rutas.get("/wrong-debounce-wrong", incrementDebounceMixedCount)
rutas.get("/wrong-throttle-wrong", incrementThrottleMixedCount)

export default rutas;

//POKEMON EXAMPLE
rutas.get("/memoize",(req, res)=>{
    res.sendFile('memoize.html', { root: publicDirectory });
})
rutas.post("/pokemon",debouncedFetch)