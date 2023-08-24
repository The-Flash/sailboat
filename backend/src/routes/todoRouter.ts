import { Router } from "express";
import { addSubTask, createTodoTask, getTodos, updateTodoTask } from "../controllers/todos";
import { inputSanitizer } from "../middlewares/inputSanitizer";
import { requiredFieldsValidator } from "../middlewares/requiredFieldsValidator";

const todoRouter = Router();

todoRouter.get("/", getTodos);

todoRouter.post("/create",
    inputSanitizer,
    requiredFieldsValidator(["title"], "body"),
    createTodoTask
);

todoRouter.post("/add-subtask/:todo_id",
    inputSanitizer,
    requiredFieldsValidator(["title"], "body"),
    addSubTask
);

todoRouter.put("/update-task/:parent/:child?",
    inputSanitizer,
    requiredFieldsValidator(["status"], "body"),
    updateTodoTask
);

export default todoRouter;