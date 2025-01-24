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
