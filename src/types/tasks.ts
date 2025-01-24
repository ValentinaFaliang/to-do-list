export interface Task {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

export interface TaskDaily extends Task {
  todaysTask: boolean;
}

export interface TasksResponse {
  todos: Task[]; // Список задач
  total: number; // Общее количество задач
  skip: number; // Пропущенные задачи (пагинация)
  limit: number; // Лимит задач на страницу
}
