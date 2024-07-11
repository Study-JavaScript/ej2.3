import { addTask, completeTask, deleteTask, listTasks } from "../app";
import { Request, Response } from "express";
import { debounceHandler } from "../utils/debounce";


export function handleGetBadTasks(req: Request, res: Response) {
    console.log("Here we are, handleGetTasks");
    const tasks = listTasks();
    res.json(tasks);
}



 function handleAddTask(req: Request, res: Response): void {
    console.log("Here we are, post tasks");
    const { description } = req.body;
    addTask(description);
    const tasks = listTasks();
    res.json(tasks);
  }

 function handleCompleteTask(req: Request, res: Response): void {
    const taskId = parseInt(req.params.id);
    completeTask(taskId);
    const tasks = listTasks();
    res.json(tasks);
  }


function handleDeleteTask(req: Request, res: Response): void {
    const taskId = parseInt(req.params.id);
    deleteTask(taskId);
    const tasks = listTasks();
    res.json(tasks);
  }

export const debouncedAddTask = debounceHandler(handleAddTask, 2000)
export const debouncedCompleteTask = debounceHandler(handleCompleteTask, 2000)
export const debouncedDeleteTask = debounceHandler(handleDeleteTask, 2000)