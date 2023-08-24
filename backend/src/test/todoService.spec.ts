import { expect } from "chai";
import { TodoService } from "../services/todo.service";
import { APIError } from "../utils/apiError";
import { testTodoCollection } from "./config";

describe("createTask", function () {
    let todoService: TodoService;

    before(function () {
        todoService = new TodoService(testTodoCollection);
    })

    it("creates a task successfully and returns it", async function () {
        const title = "Test Task";
        const task = await todoService.createTask({
            title,
        });
        expect(task).to.haveOwnProperty("title");
        expect(task).to.haveOwnProperty("status");
        expect(task).to.haveOwnProperty("created_at");
        expect(task.status).to.be.eq("pending");
        expect(task.title).to.be.eq(title);
    })
})

describe("getTasks", function () {
    let todoService: TodoService;

    before(function () {
        todoService = new TodoService(testTodoCollection);
    })

    it("returns a list of tasks with subtasks", async function () {
        const title = "Test task title";
        await todoService.createTask({ title });
        const tasks = await todoService.getTasks();
        expect(tasks.length).to.greaterThan(0);
        const task = tasks[0];
        expect(task.subtasks).to.not.be.undefined
        expect(task.subtasks).to.not.be.null;
        expect(task).to.haveOwnProperty("title")
        expect(task).to.haveOwnProperty("id")
        expect(task).to.haveOwnProperty("created_at")
        expect(task).to.haveOwnProperty("status")
        expect(Array.isArray(task.subtasks)).to.be.true;
    })
})

describe("validateTaskStatus", function () {
    let todoService: TodoService;

    before(function () {
        todoService = new TodoService(testTodoCollection);
    })

    it("does not throw an error when status is 'completed'", function () {
        expect(() => {
            todoService.validateTaskStatus("completed")
        }).to.not.throw;
    })

    it("does not throw an error when status is 'pending'", function () {
        expect(() => {
            todoService.validateTaskStatus("pending")
        }).to.not.throw;
    })

    it("throws an API error when invalid status is passed", function () {
        try {
            todoService.validateTaskStatus("a wrong status" as any);
            expect.fail();
        } catch (e) {
            expect(e instanceof APIError).to.be.true;
        }
    })
})

describe("addSubTask", function () {
    let todoService: TodoService;

    before(function () {
        todoService = new TodoService(testTodoCollection);
    })

    it("successfully adds subtask to a task", async function () {
        const title = "Task title";
        const task = await todoService.createTask({ title });
        const subtaskTitle = "Subtask Title";
        const subtask = await todoService.addSubTask(task.id, { title: subtaskTitle });
        expect(subtask.title).to.be.eq(subtaskTitle);
        expect(subtask.id).to.not.be.null;
        expect(subtask.id).to.not.be.undefined;
        expect(subtask.status).to.be.eq("pending");
    })
})

describe("updateTask", function () {
    let todoService: TodoService;

    before(function () {
        todoService = new TodoService(testTodoCollection);
    })

    it("throws an APIError when invalid status is passed", async function () {
        try {
            await todoService.updateTask("", "", "completing" as any);
            expect.fail();
        } catch (e) {
            expect(e instanceof APIError).to.be.true;
        }
    })

    it("updates parent task", async function () {
        const title = "Test Task";
        const task = await todoService.createTask({ title });
        const response = await todoService.updateTask(task.id, null, "completed");
        expect(response).to.not.haveOwnProperty("parentId");
        expect(response).to.not.haveOwnProperty("parentStatus");
        expect(response?.status).to.be.eq("completed");
    })

    it("completes parent and child task(only one subtask)", async function () {
        const title = "Test Task";
        const subtaskTitle = "Sub Task Title";
        const task = await todoService.createTask({ title });
        const subtask = await todoService.addSubTask(task.id, { title: subtaskTitle });
        const response = await todoService.updateTask(task.id, subtask.id, "completed");
        expect(response).to.haveOwnProperty("parentId");
        expect(response).to.haveOwnProperty("parentStatus");
        expect(response?.status).to.be.eq("completed");
        // parent task has only one subtask so completing subtask should also complete parent
        if ("parentStatus" in response!) {
            expect(response?.parentStatus).to.be.eq("completed");
        }
    })

    it("does not complete parent task if more than one subtask are updated", async function() {
        const title = "Test Task";
        const subtaskTitle = "Sub Task Title";
        const task = await todoService.createTask({ title });
        // add two subtasks
        await todoService.addSubTask(task.id, { title: subtaskTitle });
        const subtask = await todoService.addSubTask(task.id, { title: subtaskTitle });
        const response = await todoService.updateTask(task.id, subtask.id, "completed");
        expect(response).to.haveOwnProperty("parentId");
        expect(response).to.haveOwnProperty("parentStatus");
        expect(response?.status).to.be.eq("completed");
        // parent task has twp subtasks so completing one subtask should also not complete parent
        if ("parentStatus" in response!) {
            expect(response?.parentStatus).to.be.eq("pending");
        }
    })
})