import { Request, Response } from "express";
import { addTask, completeTask, deleteAllTasks, deleteTask, listTasks } from "../app";
import { debounce } from "../utils/debounce";

// Crear funciones debounced
const debouncedAddTask = debounce((description: string) => addTask(description), 2000);
const debouncedCompleteTask = debounce((taskId: number) => completeTask(taskId), 2000);
const debouncedDeleteTask = debounce((taskId: number) => deleteTask(taskId), 2000);
const debouncedDeleteAllTasks = debounce(()=>deleteAllTasks(),2000)

export async function handleGetGoodTasks(req: Request, res: Response): Promise<void> {
  console.log("Here we are, handleGetTasks");
  const tasks = listTasks();
  res.json(tasks);
}

export function handleAddTask(req: Request, res: Response): void {
  console.log("Here we are, post tasks");
  const { description } = req.body;
  debouncedAddTask(description);

  // Esperar a que el debounce termine antes de enviar la respuesta
  setTimeout(() => {
    const tasks = listTasks();
    res.json(tasks);
  }, 2100);
}

export function handleCompleteTask(req: Request, res: Response): void {
  const taskId = parseInt(req.params.id);
  debouncedCompleteTask(taskId);

  // Esperar a que el debounce termine antes de enviar la respuesta
  setTimeout(() => {
    const tasks = listTasks();
    res.json(tasks);
  }, 2100);
}

export function handleDeleteTask(req: Request, res: Response): void {
  const taskId = parseInt(req.params.id);
  debouncedDeleteTask(taskId);

  // Esperar a que el debounce termine antes de enviar la respuesta
  setTimeout(() => {
    const tasks = listTasks();
    res.json(tasks);
  }, 2100);
}

export function handleDeleteAllTasks(req: Request, res: Response): void {
  debouncedDeleteAllTasks();
  setTimeout(() => {
    const tasks = listTasks();
    res.json(tasks);
  }, 2100);
}