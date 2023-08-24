import { create } from "zustand";
import api from "../api";
import { ITask, TaskStatus } from "../types";

interface ITaskState {
    tasks: ITask[];
    getTasks: () => Promise<void>;
    createTask: (title: string) => Promise<void>;
    addSubTask: (parentTaskId: string, title: string) => Promise<void>;
    updateTaskStatus: (parent: string, child: string | null, status: TaskStatus) => Promise<void>;
}

export const useTasksStore = create<ITaskState>((set, get) => ({
    tasks: [],
    getTasks: async () => {
        const tasks = await api.getTasks();
        set({
            tasks
        });
    },
    createTask: async (title: string) => {
        await api.createTask({ title });
        await get().getTasks();
    },
    addSubTask: async (parentTaskId: string, title: string) => {
        await api.addSubTask(parentTaskId, { title });
        await get().getTasks();
    },
    updateTaskStatus: async (parent: string, child: string | null, status: TaskStatus) => {
        await api.updateTaskStatus(parent, child, { status })
        await get().getTasks();
    }
}));