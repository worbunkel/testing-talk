import { Component, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';
import * as Utils from './utils';
import { Task, TaskStatus, TaskSortMode } from './task.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('newTaskInput') newTaskInput: ElementRef;

  public tasks: Array<Task> = [
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

  public incompleteTasks: Array<Task> = [];
  public completeTasks: Array<Task> = [];

  public sortMode = 'Alphabetically';

  constructor() {
    this.incompleteTasks = this.tasks.filter(task => task.status === TaskStatus.incomplete);
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);
  }

  // ANONYMOUS FUNCTIONS
  // How would I test that to see if the incomplete task filter actually does what I want?
  filterTasks(): void {
    this.incompleteTasks = this.tasks.filter(task => task.status === TaskStatus.incomplete);
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);
  }

  // Functions should do 1 thing
  toggleTaskStatus(task): void {
    task.status = task.status === TaskStatus.complete
      ? TaskStatus.incomplete
      : TaskStatus.complete;
    this.filterTasks();
  }

  // How can I expect the result of this??
  getTaskAge(task): number {
    const now = Date.now();
    return now - new Date(task.create).getTime();
  }

  // Use Ternaries
  // Write predicates for conditionals
  changeSortMode(): void {
    if (this.sortMode === 'Alphabetically') {
      this.sortMode = 'Created Time';
    } else {
      this.sortMode = 'Alphabetically';
    }
  }

  addTask(): void {
    const newTaskInput = this.newTaskInput.nativeElement.value;
    const newTask = { name: newTaskInput, status: TaskStatus.incomplete, create: new Date().toISOString() };
    this.tasks.push(newTask);
    this.filterTasks();
    this.newTaskInput.nativeElement.value = '';
  }

  deleteTask(taskToDelete): void {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.filterTasks();
  }

  // TDD THIS SORT TASKS THING
  //  should sort alphabetically
  //    numbers come before caps
  //    capitals come before non caps
  //  should sort by created time when sort mode is created time
  //    earlier create times come first
  sortTasks(): void {
    this.tasks.sort((a: Task, b: Task) => {
      if (this.sortMode === 'Alphabetically') {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      } else if (this.sortMode === 'Created Time') {
        if (this.getTaskAge(a) < this.getTaskAge(b)) {
          return 1;
        } else {
          return -1;
        }
      }
    });
    this.filterTasks();
  }
}
