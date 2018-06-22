import { Component } from '@angular/core';
import * as _ from 'lodash';
import * as Utils from './utils';
import { Task, TaskStatus, TaskSortMode } from './task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private _tasks: Array<Task> = [];

  public set tasks(tasks: Array<Task>) {
    this._tasks = tasks;
    [this.incompleteTasks, this.completeTasks] = Utils.filterTasks(this.tasks);
  }

  public get tasks(): Array<Task> {
    return this._tasks;
  }

  public incompleteTasks: Array<Task> = [];
  public completeTasks: Array<Task> = [];

  public sortMode: TaskSortMode = TaskSortMode.alphabetically;

  constructor() {
    this.tasks = [
      {
        name: 'Hold the Line',
        status: TaskStatus.incomplete,
        create: new Date(Date.now()).toISOString(),
      },
      {
        name: 'Bless the rains down in Africa',
        status: TaskStatus.incomplete,
        create: new Date(Date.now() + 100).toISOString(),
      },
      {
        name: 'Completed Task',
        status: TaskStatus.complete,
        create: new Date(Date.now() + 200).toISOString(),
      },
    ];
  }

  toggleTaskStatus(task: Task): void {
    this.tasks = Utils.toggleTaskStatus(task, this.tasks);
  }

  changeSortMode(): void {
    this.sortMode = Utils.changeSortMode(this.sortMode);
  }

  addTask(newTaskInput: HTMLInputElement): void {
    const newTaskName = _.get(newTaskInput, 'value');
    const currentTimeISOString = new Date().toISOString();

    this.tasks = Utils.addNewTaskByName(newTaskName, currentTimeISOString, this.tasks);
    Utils.clearInput(newTaskInput);
  }

  deleteTask(taskToDelete): void {
    this.tasks = Utils.deleteTask(taskToDelete, this.tasks);
  }

  sortTasks(): void {
    const currentTime = Date.now();

    this.tasks = Utils.sortTasks(this.tasks, this.sortMode, currentTime);
  }

}
