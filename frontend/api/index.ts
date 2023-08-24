import { ITask, TaskStatus } from "../types";
import { taskAPI } from "./setup";
import type { AxiosResponse } from "axios";

export const getTasks = async (): Promise<ITask[]> => {
    const response = await taskAPI.get<any, AxiosResponse<ITask[], any>, any>("/todos");
    return response.data;
}

export const createTask = async (data: { title: string }) => {
    await taskAPI.post("/todos/create", { title: data.title });
}

export const addSubTask = async (parentTaskId: string, data: { title: string }) => {
    await taskAPI.post(`/todos/add-subtask/${parentTaskId}`, {
        title: data.title
    });
}

export const updateTaskStatus = async (parent: string, child: string | null, data: { status: TaskStatus }) => {
    let path = parent;
    if (child) {
        path = `${parent}/${child}`;
    }
    await taskAPI.put(`/todos/update-task/${path}`, {
        status: data.status
    });
}

export default { getTasks, createTask, addSubTask, updateTaskStatus }