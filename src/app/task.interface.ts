export interface Task {
  name: string;
  status: string;
  create: string;
}

export enum TaskStatus {
  complete = 'COMPLETE',
  incomplete = 'INCOMPLETE',
}

export enum TaskSortMode {
  alphabetically = 'ALPHABETICALLY',
  date = 'CREATED TIME',
}
