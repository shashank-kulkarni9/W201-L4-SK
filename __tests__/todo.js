const todoList = require("../todo");

const {
  all,
  add,
  markAsComplete,
  overdue,
  dueToday,
  dueLater,
  toDisplayableList,
} = todoList();

describe("Todo list test suite", () => {
  beforeAll(() => {
    add({
      title: "test_1",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    add({
      title: "test_2",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      completed: false,
    });
    add({
      title: "test_3",
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
      completed: false,
    });
    add({
      title: "test_4",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    add({
      title: "test_5",
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      completed: false,
    });
  });
  test("Add new todo", () => {
    const length_before_adding = all.length;
    add({
      title: "test todo",
      dueDate: new Date().toLocaleDateString("en-CA"),
      completed: false,
    });
    expect(all.length).toBe(length_before_adding + 1);
  });
  test("Mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
  test("Retrive overdue items", () => {
    overdue().forEach((e) => {
      expect(e.dueDate < new Date().toLocaleDateString("en-CA")).toBe(true);
    });
  });
  test("Retrive due today items", () => {
    dueToday().forEach((e) => {
      expect(e.dueDate === new Date().toLocaleDateString("en-CA")).toBe(true);
    });
  });
  test("Retrive due later items", () => {
    dueLater().forEach((e) => {
      expect(e.dueDate > new Date().toLocaleDateString("en-CA")).toBe(true);
    });
  });
});
