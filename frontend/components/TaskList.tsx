import { useEffect, useState } from "react";
import { useTasksStore } from "../store";
import {
    Accordion, Box, Center, Text,
} from "@chakra-ui/react";
import { TaskItem } from "./TaskItem";
import { CustomCircularProgress } from "./CustomCircularProgress";

export function TaskList() {
    const [isLoading, setIsLoading] = useState(true);
    const getTasks = useTasksStore(state => state.getTasks);
    const tasks = useTasksStore(state => state.tasks);

    useEffect(() => {
        setIsLoading(true);
        getTasks().finally(() => {
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return (
            <Center p="2">
                <CustomCircularProgress />
            </Center>
        )
    }

    if (tasks.length === 0) {
        return (
            <Box p="3.5">
                <Text textAlign="center" fontSize="sm">You have no tasks yet</Text>
            </Box>
        )
    }

    return (
        <Accordion>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </Accordion>
    )
}