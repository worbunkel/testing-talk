import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('newTaskInput') newTaskInput: ElementRef;
  public tasks: Array<Task> = [
    {
      name: 'Brush my Teeth',
      status: TaskStatus.complete,
      create: '2002-02-02 00:00:00T',
    },
    {
      name: 'Clean my room',
      status: TaskStatus.incomplete,
      create: '2002-03-02 00:00:00T',
    }
  ];
  public incompleteTasks: Array<Task> = [];
  public completeTasks: Array<Task> = [];

  constructor() {

    this.incompleteTasks = this.tasks.filter(task => task.status === TaskStatus.incomplete);
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);
  }

  filterTasks() {
    this.incompleteTasks = this.tasks.filter(task => task.status === TaskStatus.incomplete);
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);
  }

  toggleTaskStatus(task) {
    task.status = task.status === TaskStatus.complete
      ? TaskStatus.incomplete
      : TaskStatus.complete;
    this.filterTasks();
  }

  getTaskAge(task) {
    const now = Date.now();

    return now - new Date(task.created).getTime();
  }

  sortTasks() {
    this.tasks.sort((a: any, b: any) => a.name - b.name);
  }

  addTask() {
    const newTaskInput = this.newTaskInput.nativeElement.value;
    console.warn(newTaskInput);
    const newTask = { name: newTaskInput, status: TaskStatus.incomplete, create: new Date().toISOString() };
    this.tasks.push(newTask);
    this.filterTasks();
  }
}

export interface Task {
  name: string;
  status: TaskStatus;
  create: string;
}

enum TaskStatus {
  complete = 'COMPLETE',
  incomplete = 'INCOMPLETE',
}
