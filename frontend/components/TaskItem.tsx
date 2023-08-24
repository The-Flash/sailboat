import {
    AccordionItem,
    AccordionButton,
    Center,
    Box,
    Checkbox,
    Spacer,
    AccordionPanel,
    Flex,
    Text
} from "@chakra-ui/react";
import { ITask } from "../types";
import { TaskCompletionRate } from "./TaskCompletionRate";
import { SubTasksContainer } from "./SubTasksContainer";
import { TaskCheckbox } from "./TaskCheckbox";

interface IProps {
    task: ITask
}

export function TaskItem({ task }: IProps) {
    const isCompleted = task.status === "completed";
    return (
        <AccordionItem key={task.id}>
            <AccordionButton p="4">
                <Center>
                    <Box>
                        <TaskCheckbox
                            parent={task.id}
                            child={null}
                            status={task.status}
                        />
                    </Box>
                    <Spacer p="4" />
                    <Box>
                        {task.title}
                    </Box>
                </Center>
            </AccordionButton>
            <TaskCompletionRate subtasks={task.subtasks} />
            <AccordionPanel>
                <SubTasksContainer subtasks={task.subtasks} parentTaskId={task.id} />
            </AccordionPanel>
        </AccordionItem>
    )
}