import {
    Input,
    Button,
    Flex,
    Spacer,
    Box,
    useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAddSubTask } from "../hooks/useAddSubTask";
import { CustomCircularProgress } from "./CustomCircularProgress";

interface IProps {
    parentTaskId: string
}

export function AddSubTask({ parentTaskId }: IProps) {
    const [title, setTitle] = useState("");
    const { addSubTask, isLoading, isSuccess, error } = useAddSubTask();
    const toast = useToast();


    function handleAddSubTask() {
        addSubTask(parentTaskId, title).then(() => {
            setTitle("");
        })
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
                        : <Button onClick={handleAddSubTask}>Add</Button>
                }
            </Box>
        </Flex>
    )
}