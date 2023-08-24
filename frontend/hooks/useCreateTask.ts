import { useState } from "react";
import { useTasksStore } from "../store";
import { isAxiosError } from "axios";
// import type { Er} from "axios";
export function useCreateTask() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const createTaskAsync = useTasksStore(state => state.createTask);

    async function createTask(title: string) {
        try {
            if (!title) {
                setError("Enter a title");
                return;
            }
            setIsSuccess(false);
            setIsLoading(true);
            setError(null);
            await createTaskAsync(title);
            setIsSuccess(true);
        } catch (e) {
            if (isAxiosError(e)) {
                setError(e.response?.data?.message);
            } else {
                setError("An error occurred. Try again later");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return {
        error,
        isLoading,
        createTask,
        isSuccess
    }
}