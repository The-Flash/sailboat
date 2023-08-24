import { Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { ISubTask } from "../types";

interface IProps {
    subtasks: ISubTask[]
}

export function TaskCompletionRate({ subtasks }: IProps) {

    const [numCompleted, totalLength] = useMemo(() => {
        const numCompleted = subtasks.filter((task) => task.status === "completed").length;
        return [numCompleted, subtasks.length];
    }, [subtasks]);

    return (
        <Text fontSize="small" textAlign="right" color="GrayText">{numCompleted} of {totalLength} completed</Text>
    )
}