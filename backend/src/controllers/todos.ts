import type { NextFunction, Request, Response } from "express";
import { todoService } from "../services";
import { ITask } from "../types";
import { HTTP_200_OK, HTTP_201_CREATED } from "../utils/statusCodes";

export const getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await todoService.getTasks();
        res.status(HTTP_200_OK).json(tasks);
    } catch (e) {
        next(e);
    }
}

export const createTodoTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as Pick<ITask, "title">;
        const response = await todoService.createTask(data);
        res.status(HTTP_201_CREATED).json(response);
    } catch (e) {
        next(e);
    }
}

export const addSubTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { todo_id } = req.params as { todo_id: string };
        const data = req.body as Pick<ITask, "title">;
        const response = await todoService.addSubTask(todo_id, data);
        res.status(HTTP_200_OK).json(response);
    } catch (e) {
        next(e);
    }
}

export const updateTodoTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { parent, child } = req.params;
        const { status } = req.body;
        await todoService.updateTask(parent, child, status);
        res.status(HTTP_200_OK).json({
            message: "Task updated"
        });
    } catch (e) {
        next(e);
    }
}