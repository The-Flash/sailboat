import {
    Input,
    Button,
    Flex,
    Spacer,
    Box,
    useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import { CustomCircularProgress } from "./CustomCircularProgress";

export function AddTask() {
    const { createTask, isLoading, isSuccess, error } = useCreateTask();
    const [title, setTitle] = useState("");
    const toast = useToast();

    function handleAddTask() {
        createTask(title).then(() => {
            setTitle("");
        });
    }

    useEffect(() => {
        if (error !== null) {
            toast({
                title: "Error",
                description: error,
                status: "error",
                isClosable: true,
            });
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Task added",
                description: "Successfully added new task",
                status: "success",
                isClosable: true,
            });
        }
    }, [isSuccess]);

    return (
        <Flex>
            <Box>
                <Input
                    placeholder='What to do?'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </Box>
            <Spacer p="4" />
            <Box>
                {
                    isLoading
                        ?
                        <CustomCircularProgress />
                        : <Button onClick={handleAddTask}>Add</Button>
                }
            </Box>
        </Flex>
    )
}