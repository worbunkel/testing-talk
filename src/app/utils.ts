import { TaskStatus, Task, TaskSortMode } from './task.interface';

export const addNewTaskByName = (newTaskName: string, createTimeISOString: string, tasks: Readonly<Array<Task>>) => {
  const newTask = newTaskName ? {
    name: newTaskName,
    status: TaskStatus.incomplete,
    create: createTimeISOString,
  } : null;
  return addNewTask(newTask, tasks);
};

export const addNewTask = (newTask: Task, tasks: Readonly<Array<Task>>) =>
  tasks.concat(newTask);

// impure, but we can test
export const clearInput = (inputEl: HTMLInputElement): void => {
  inputEl.value = '';
};

export const filterTasks = (tasks: Array<Task>): [Array<Task>, Array<Task>] => {
  const incompleteTasks = tasks.filter(isIncomplete);
  const completeTasks = tasks.filter(isComplete);
  return [incompleteTasks, completeTasks];
};

export const isIncomplete = (task: Task): boolean =>
  task.status === TaskStatus.incomplete;

export const isComplete = (task: Task): boolean =>
  task.status === TaskStatus.complete;

export const deleteTask = (task: Task, tasks: Array<Task>): Array<Task> => {
  const isNotTask = makeIsNotTask(task);
  return tasks.filter(isNotTask);
};

export const makeIsNotTask = (firstTask: Task): ((secondTask: Task) => boolean) =>
  (secondTask: Task) => firstTask.create !== secondTask.create || firstTask.name !== secondTask.name;

export const toggleTaskStatus = (taskToToggle: Task, tasks: Array<Task>): Array<Task> => {
  const tasksWithoutTaskToToggle = deleteTask(taskToToggle, tasks);
  const toggledTask = { ...taskToToggle, status: getOppositeStatus(taskToToggle.status) };
  return addNewTask(toggledTask, tasksWithoutTaskToToggle);
};

export const getOppositeStatus = (status: string) =>
  status === TaskStatus.incomplete ? TaskStatus.complete : TaskStatus.incomplete;

export const getTaskAge = (task: Task, currentTime: number): number =>
  currentTime - new Date(task.create).getTime();

export const sortTasksAlphabetically = (tasks: Array<Task>): Array<Task> =>
  tasks.slice().sort(compareAlphabetically);

export const compareAlphabetically = (taskA: Task, taskB: Task) =>
  taskA.name > taskB.name ? 1 : -1;

export const sortTasksByCreateTime = (tasks: Array<Task>, currentTime: number): Array<Task> => {
  const compareByTime = makeCompareByTime(currentTime);
  console.warn('sortTasksByCreateTime');
  return tasks.slice().sort(compareByTime);
};

export const makeCompareByTime = (currentTime: number) =>
  (taskA: Task, taskB: Task) => getTaskAge(taskA, currentTime) < getTaskAge(taskB, currentTime) ? 1 : -1;

export const sortTasks = (tasks: Array<Task>, sortMode: TaskSortMode, currentTime: number): Array<Task> =>
  isSortModeAlphabetical(sortMode)
    ? sortTasksAlphabetically(tasks)
    : sortTasksByCreateTime(tasks, currentTime);

export const isSortModeAlphabetical = (sortMode: TaskSortMode): boolean =>
  sortMode === TaskSortMode.alphabetically;

export const changeSortMode = (sortMode: TaskSortMode): TaskSortMode =>
  sortMode === TaskSortMode.alphabetically
    ? TaskSortMode.date
    : TaskSortMode.alphabetically;


