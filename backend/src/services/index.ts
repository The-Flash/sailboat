import { TodoService } from "./todo.service";

import { db } from "../firebase";

export const todoService = new TodoService(db.collection("todos"));