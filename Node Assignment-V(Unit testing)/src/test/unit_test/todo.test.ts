import expect from "expect";
import sinon from "sinon";
import ITODO from "../../interfaces/todo.interface";
import * as TodosModel from "../../models/todo.model";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../../services/todo.services";

describe("Todos Service Test Suite", () => {
  describe("getTodos", () => {
    let todoModelGetTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoStub = sinon.stub(TodosModel, "getTodos");
    });

    afterEach(() => {
      todoModelGetTodoStub.restore();
    });

    it("should return all todos created by user", () => {
      const userId = "1";

      const expectedTodos = [
        {
          id: "1",
          title: "CODE",
          description: "CODE CODE CODE",
          userId: "1",
        },
        {
          id: "2",
          title: "COOK",
          description: "COOK COOK COOK",
          userId: "2",
        },
        {
          id: "3",
          title: "PLAY",
          description: "FOOTBALL",
          userId: "1",
        },
        {
          id: "4",
          title: "ASSIGNMENT",
          description: "Do Assignment",
          userId: "2",
        },
      ];

      todoModelGetTodoStub.returns(expectedTodos);

      const response = getTodos(userId);

      expect(todoModelGetTodoStub.calledOnceWith(userId)).toBe(true);
      expect(response).toStrictEqual(expectedTodos);
    });
  });

  describe("getTodoById", () => {
    let todoModelGetTodoByIdStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoByIdStub = sinon.stub(TodosModel, "getTodosById");
    });

    afterEach(() => {
      todoModelGetTodoByIdStub.restore();
    });

    it("should return Error Retriving todo datas when todo  is not found", () => {
      const userId = "1";
      const todoId = "100";
      todoModelGetTodoByIdStub.returns("Error Retriving todo datas");

      const response = getTodoById(todoId, userId);

      expect(response).toBe("Error Retriving todo datas");
      expect(todoModelGetTodoByIdStub.calledOnceWith(todoId, userId)).toBe(
        true
      );
    });

    it("show return todo if todo is found", () => {
      const userId = "1";
      const todoId = "1";
      const expectedOutput = {
        id: "1",
        title: "CODE",
        description: "CODE CODE CODE",
        userId: "1",
      };

      todoModelGetTodoByIdStub.returns(expectedOutput);

      const response = getTodoById(todoId, userId);

      expect(response).toBe(expectedOutput);
      expect(todoModelGetTodoByIdStub.calledOnceWith(todoId, userId)).toBe(
        true
      );
    });
  });

  describe("createTodo", () => {
    let todoModelCreateTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelCreateTodoStub = sinon.stub(TodosModel, "createTodo");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should call TodoModel.createTodo with correct arguments", () => {
      const userId = "123";
      const todo: ITODO = {
        title: "Test Todo",
        description: "This is a test todo",
        userId: "123",
      };

      createTodo(userId, todo);

      expect(todoModelCreateTodoStub.calledOnce).toBe(true);
      expect(todoModelCreateTodoStub.calledWith(userId, todo)).toBe(true);
    });

    it("should not return any value", () => {
      const userId = "123";
      const todo: ITODO = {
        title: "Test Todo",
        description: "This is a test todo",
        userId: "123",
      };

      const result = createTodo(userId, todo);

      expect(result).toBeUndefined();
    });
  });

  describe("deleteTodo", () => {
    let todoModelGetTodoByIdStub: sinon.SinonStub;
    let todoModelDeleteTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelGetTodoByIdStub = sinon.stub(TodosModel, "getTodosById");
      todoModelDeleteTodoStub = sinon.stub(TodosModel, "deleteTodo");
    });
    afterEach(() => {
      sinon.restore();
    });

    it("should return undefined after deleting an existing todo", () => {
      const todoId = "1";
      const userId = "1";

      const todo = {
        id: todoId,
        title: "Test Todo",
        description: "This is a test todo",
        userId: userId,
      };

      todoModelGetTodoByIdStub.returns(todo);

      const response = deleteTodo(todoId, userId);

      expect(todoModelGetTodoByIdStub.calledOnceWith(todoId, userId)).toBe(
        true
      );
      expect(todoModelDeleteTodoStub.calledOnceWith(todoId)).toBe(true);
      expect(response).toBeUndefined();
    });

    it("should return null when todo does not exist", () => {
      const todoId = "100";
      const userId = "1";

      todoModelGetTodoByIdStub.returns(undefined);

      const response = deleteTodo(todoId, userId);

      expect(todoModelGetTodoByIdStub.calledOnceWith(todoId, userId)).toBe(
        true
      );
      expect(todoModelDeleteTodoStub.called).toBe(false);
      expect(response).toBe(null);
    });
  });

  describe("updateTodo", () => {
    let todoModelUpdateTodoStub: sinon.SinonStub;

    beforeEach(() => {
      todoModelUpdateTodoStub = sinon.stub(TodosModel, "updateTodo");
    });

    afterEach(() => {
      sinon.restore();
    });

    it("should call TodoModel.updateTodo with correct arguments", () => {
      const id = "1";
      const userId = "123";
      const newTodo: ITODO = {
        title: "Updated Todo",
        description: "This is an updated todo",
        userId: userId,
      };

      updateTodo(id, newTodo, userId);

      expect(todoModelUpdateTodoStub.calledOnce).toBe(true);
      expect(todoModelUpdateTodoStub.calledWith(id, newTodo, userId)).toBe(
        true
      );
    });

    it("should return the result from TodoModel.updateTodo", () => {
      const id = "1";
      const userId = "123";
      const newTodo: ITODO = {
        title: "Updated Todo",
        description: "This is an updated todo",
        userId: userId,
      };
      const expectedResult = [{ id: "1", userId: "123", ...newTodo }];

      todoModelUpdateTodoStub.returns(expectedResult);

      const result = updateTodo(id, newTodo, userId);

      expect(result).toEqual(expectedResult);
    });

    it("should return null if TodoModel.updateTodo returns an empty array", () => {
      const id = "1";
      const userId = "123";
      const newTodo: ITODO = {
        title: "Updated Todo",
        description: "This is an updated todo",
        userId: userId,
      };

      todoModelUpdateTodoStub.returns([]);

      const result = updateTodo(id, newTodo, userId);

      expect(result).toEqual([]);
    });
  });
});
