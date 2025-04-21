export interface User {
  id?: string;
  name: string;
  password: string;
  email?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: "TODO" | "DOING" | "DONE";
}

export interface TaskGrouping {
  groupName: string;
  data: Task[];
  totalItemHidden: number;
  isGroupHidden: boolean;
}

export interface TaskList {
  tasks: Task[];
  tasksGrouing?: TaskGrouping[];
  count?: number;
  pageNumber: number;
  totalPages: number;
}
