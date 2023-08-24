import { Flex, Checkbox, Box, Text } from "@chakra-ui/react";
import { ISubTask } from "../types"
import { AddSubTask } from "./AddSubTask"
import { TaskCheckbox } from "./TaskCheckbox";

interface IProps {
    subtasks: ISubTask[];
    parentTaskId: string;
}

export function SubTasksContainer({ subtasks, parentTaskId }: IProps) {
    return (
        <div>
            <ul>
                {subtasks.map((task) => (
                    <Flex pl="3.5" key={task.id}>
                        <Box p="1.5">
                            <TaskCheckbox
                                parent={parentTaskId}
                                child={task.id}
                                status={task.status}
                            />
                        </Box>
                        <Box p="1.5">
                            <Text fontSize="sm">
                                {task.title}
                            </Text>
                        </Box>
                    </Flex>
                ))}
            </ul>
            <AddSubTask parentTaskId={parentTaskId} />
        </div>
    )
}