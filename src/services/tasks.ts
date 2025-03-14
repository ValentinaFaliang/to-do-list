import { Task, TasksResponse } from "../types/tasks";

export const url = "https://dummyjson.com/todos";

export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request);
  const data = await response.json();
  return data;
}

export async function getAllTasks() {
  try {
    const tasks: Task[] = [];
    const res: TasksResponse = await http<TasksResponse>(
      `${url}?limit=10&skip=20`,
    );
    tasks.push(...res.todos);
    return tasks;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllTasksByUserId(id: number) {
  try {
    const userTasks = [];
    userTasks.push(await http(`${url}/user/${id}`));
    return userTasks;
  } catch (error) {
    console.log(error);
  }
}

export async function addTodo(todo: string, userId?: number) {
  const body: { todo: string; completed: boolean; userId?: number } = {
    todo,
    completed: false,
  };

  if (userId !== undefined) {
    body.userId = userId;
  }

  const response = await fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Ошибка при добавлении задачи");
  }

  return response.json();
}
