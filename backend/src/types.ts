type TaskStatus = "pending" | "completed";

export interface ISubTask {
    id: string;
    title: string;
    status: TaskStatus,
    created_at: string;
}

export interface ITask {
    id: string;
    title: string;
    status: TaskStatus,
    created_at: string;
    subtasks: ISubTask[]
}