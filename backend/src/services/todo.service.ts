import { CollectionReference } from "firebase-admin/firestore";
import { ISubTask, ITask } from "../types";
import { APIError } from "../utils/apiError";

type TaskStatus = "pending" | "completed";

interface ICreateTaskParams {
    title: string;
}

interface IUpdateChildTaskResponse extends ISubTask {
    parentId: string;
    parentStatus: TaskStatus,
}

const SUBTASKS_KEY = "subtasks";

export class TodoService {
    constructor(
        private todoCollection: CollectionReference,
    ) { }

    async createTask(data: ICreateTaskParams): Promise<ITask> {
        const todo = {
            title: data.title,
            status: "pending",
            created_at: (new Date).toISOString()
        }
        const todoRef = await this.todoCollection.add(todo);
        const response = await todoRef.get();
        const todoDoc = response.data() as ITask;
        return {
            id: todoRef.id,
            title: todoDoc.title,
            status: todoDoc.status,
            created_at: todoDoc.created_at,
            subtasks: []
        };
    }

    async getTasks(): Promise<ITask[]> {
        const response = await this.todoCollection.orderBy("created_at", "desc").get();
        const data = [] as ITask[];
        for (let doc of response.docs) {
            const subtasksDocs = await doc.ref.collection(SUBTASKS_KEY).get();
            const subtasks = subtasksDocs.docs.map(taskDoc => ({
                id: taskDoc.id,
                title: taskDoc.data().title,
                status: taskDoc.data().status,
                created_at: taskDoc.data().created_at,
            }));
            data.push({
                id: doc.id,
                title: doc.data().title,
                status: doc.data().status,
                created_at: doc.data().created_at,
                subtasks
            });
        }
        return data;
    }

    async addSubTask(todo_id: string, data: ICreateTaskParams): Promise<ISubTask> {
        const todoRef = this.todoCollection.doc(todo_id);
        // set parent task to "pending"
        await todoRef.update({
            status: "pending"
        });
        const response = await todoRef.collection(SUBTASKS_KEY).add({
            title: data.title,
            status: "pending",
            created_at: (new Date).toISOString()
        });
        const snapshot = await response.get();
        const snapshotData = snapshot.data();
        return {
            id: snapshot.id,
            title: snapshotData?.title,
            created_at: snapshotData?.created_at,
            status: snapshotData?.status,
        };
    }

    async updateTask(
        parent: string,
        child: string | null,
        status: TaskStatus)
        : Promise<
            ReturnType<typeof TodoService.prototype.updateParentTask> |
            ReturnType<typeof TodoService.prototype.updateChildTask> |
            undefined
        > {
        this._validateTaskStatus(status);
        try {
            if (!child) {
                const updatedTask = await this.updateParentTask(parent, status);
                return updatedTask;
            } else {
                const updatedTask = await this.updateChildTask(parent, child, status);
                return updatedTask;
            }
        } catch (e: any) {
            if ("message" in e) {
                const message = e.message as string;
                if (message.includes("NOT_FOUND")) {
                    throw new APIError("Could not find task");
                }
                throw new APIError(e.message);
            }
        }
    }

     private async updateParentTask(parent: string, status: TaskStatus): Promise<Omit<ITask, "subtasks">> {
        const docRef = this.todoCollection.doc(parent);
        await docRef.update({ status })
        if (status === "completed") {
            // update all child tasks to "completed"
            const subtaskSnapshot = await docRef.collection(SUBTASKS_KEY).get();
            const subtasks = subtaskSnapshot.docs;
            for (let subtask of subtasks) {
                await subtask.ref.update({ status });
            }
        }
        const updatedTask = await docRef.get();
        const task = updatedTask.data();
        return {
            id: updatedTask.id,
            title: task?.title,
            status: task?.status,
            created_at: task?.created_at,
        }
    }

     private async updateChildTask(parent: string, child: string, status: TaskStatus): Promise<Omit<IUpdateChildTaskResponse, "subtasks">> {
        const docRef = this.todoCollection.doc(parent);
        const childDocRef = this.todoCollection.doc(`${parent}/${SUBTASKS_KEY}/${child}`);
        if (status === "pending") { // set parent to pending
            await docRef.update({ status });
        }
        await childDocRef.update({
            status
        });
        if (status === "completed") {
            // check if all others have been completed
            const subtasks = this.todoCollection.doc(parent).collection(SUBTASKS_KEY);
            const snapshot = await subtasks.get()
            let hasCompletedParent = true;
            for (let shot of snapshot.docs) {
                const data = shot.data();
                if (data.status === "pending") {
                    hasCompletedParent = false;
                }
            }
            if (hasCompletedParent) {
                await docRef.update({ status })
            }
        }
        const childTask = await childDocRef.get();
        const childTaskData = childTask.data()
        const parentTask = await docRef.get();
        const parentTaskData = parentTask.data();
        return {
            id: childDocRef.id,
            title: childTaskData?.title,
            status: childTaskData?.status,
            created_at: childTaskData?.created_at,
            parentId: docRef.id,
            parentStatus: parentTaskData?.status
        }
    }

    private _validateTaskStatus(status: "completed" | "pending") {
        if (status === "pending") {
            return;
        }
        if (status === "completed") {
            return;
        }
        throw new APIError("status must be 'pending' or 'completed'");
    }

    public validateTaskStatus(status: "completed" | "pending") {
        this._validateTaskStatus(status);
    }
}