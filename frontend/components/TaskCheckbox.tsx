import {
    Checkbox
} from "@chakra-ui/react";
import { ChangeEvent, useState, useEffect } from "react";
import { useTasksStore } from "../store";
import { TaskStatus } from "../types";
import { CustomCircularProgress } from "./CustomCircularProgress";

interface IProps {
    status: TaskStatus,
    parent: string;
    child: string | null;
}

export function TaskCheckbox({
    status,
    parent,
    child
}: IProps) {
    const [isChecked, setIsChecked] = useState(() => {
        if (status === "completed") {
            return true;
        } else if (status === "pending") {
            return false;
        }
        return false;
    });
    const [isLoading, setIsLoading] = useState(false);
    const updateTaskStatus = useTasksStore(state => state.updateTaskStatus);

    useEffect(() => {
        setIsChecked(() => {
            if (status === "completed") {
                return true;
            } else if (status === "pending") {
                return false;
            }
            return false;
        });
    }, [status]);

    function handleToggle(e: ChangeEvent<HTMLInputElement>) {
        setIsLoading(true);
        let newStatus: TaskStatus = e.target.checked === true ? "completed" : "pending";
        updateTaskStatus(parent, child, newStatus)
            .then(() => {
                setIsLoading(false);
            })
        setIsChecked(e.target.checked);
    }

    return (
        <>{
            isLoading
                ?
                <CustomCircularProgress /> :
                <Checkbox
                    isChecked={isChecked}
                    onChange={handleToggle}
                />
        }
        </>
    )
}