import { isAxiosError } from "axios";
import { useState } from "react";
import { useTasksStore } from "../store"
import { TaskStatus } from "../types";

export function useUpdateTaskStatus() {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const updateTaskStatusAsync = useTasksStore(state => state.updateTaskStatus);

    async function updateTaskStatus(parent: string, child: string, status: TaskStatus) {
        try {
            setIsSuccess(false);
            setIsLoading(true);
            setError(null);
            await updateTaskStatusAsync(
                parent,
                child,
                status
            );
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
        updateTaskStatus,
        isSuccess
    }
}