import { useState } from "react";
import { useTasksStore } from "../store";
import { isAxiosError } from "axios";

export function useAddSubTask() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const addSubTaskAsync = useTasksStore(state => state.addSubTask);

    async function addSubTask(parentTaskId: string, title: string) {
        try {
            if (!title) {
                setError("Enter a title");
                return;
            }
            setIsSuccess(false);
            setIsLoading(true);
            setError(null);

            await addSubTaskAsync(parentTaskId, title);
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
        addSubTask,
        isSuccess
    }
}