import { toast } from "react-toastify";
import config from "../config/env";
import { getOnlyDateString } from "../helpers/date-string-format";
import { Task, TaskGrouping, TaskList } from "../types/types";
import axios from "axios";

/**
 * @param status The status of the items to retrieve. Allowed values are "TODO", "DOING", and "DONE".
 * @param offset The page number to retrieve.
 * @param limit The Number of items to return in each page.
 * @param sortBy Using the field name to sort the items by.
 * @param isAsc Whether to sort the items by ascending order or not.
 * @returns Promise object represents TaskList.
 */
export async function fetchTaskList(
  status: "TODO" | "DOING" | "DONE",
  offset?: number,
  limit?: number,
  sortBy?: string,
  isAsc?: boolean
): Promise<TaskList | null> {
  try {
    const params = {
      status,
      offset,
      limit,
      sortBy,
      isAsc,
    };
    // Call API to get task list
    const response = await axios.get(config.API_BASE_URL, { params });
    const taskList: TaskList = response.data;

    taskList.count = taskList.tasks.length;
    taskList.tasksGrouing = groupDataByCreatedAt(taskList.tasks || []);
    return taskList;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast.error("Error fetching data :", error);
    return null;
  }
}

/**
 * @param tasks Array of Task
 * @returns Array of TaskGrouping which comes from dividing Task into groups according to createdAt.
 */
function groupDataByCreatedAt(tasks: Task[]): TaskGrouping[] {
  const grouped: Record<string, TaskGrouping> = {};
  tasks.forEach((task) => {
    const dateStr = getOnlyDateString(task["createdAt"]);
    grouped[dateStr] = grouped[dateStr] || {
      groupName: dateStr,
      data: [],
      totalItemHidden: 0,
      isGroupHidden: false,
    };
    grouped[dateStr].data.push(task);
  });

  // For example.
  // grouped = {
  //   '1 nov': { groupName: '1 nov', ... },
  //   '2 nov': { groupName: '2 nov', ... },
  // }

  return Object.values(grouped);
}
