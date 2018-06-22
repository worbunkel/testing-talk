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

  getTaskAge(task): number {
    const now = Date.now();
    return now - new Date(task.create).getTime();
  }

  changeSortMode(): void {
    if (this.sortMode === 'Alphabetically') {
      this.sortMode = 'Created Time';
    } else {
      this.sortMode = 'Alphabetically';
    }
  }

  // BAD
  addTask(): void {
    const newTaskInput = this.newTaskInput.nativeElement.value;
    const newTask = { name: newTaskInput, status: TaskStatus.incomplete, create: new Date().toISOString() };
    this.tasks.push(newTask);
    this.filterTasks();
    this.newTaskInput.nativeElement.value = '';
  }

  // BAD
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


/*
describe('theCodeFile', () => {
  it('tests the firstFunction', () => {

  })
})

describe('<NOUN>', () => {
  describe('<SCENARIO>', () => {
    it('should <VERB PHRASE SPECIFICALLY EXPANING THE DESIRED BEHAVIOR>', () => {

    })
  });
});

describe('Frog', () => {
  it('should croak when it is alive and is American', () => {
  });

  it('should yodel when it is alive and is Swiss', () => {
  });

  it('should sigh when it is dead', () => {
  });
});

describe('Frog', () => {
  describe('when it is alive', () => {
    describe('when the frog is American', () => {
      it('should croak')
    });

    describe('when the frog is Swiss', () => {
      it('should yodel')
    });
  });

  describe('when it is dead', () => {
    it('should sigh')
  });
});
// "Frog should croak" <-- turns into a readable English phrase
*/

/**
 * Take advantage of the way test cases get printed.  Make your `it`s as specific as possible so that when failures
 * happen, the behavior description pinpoints the failure for you immediately
 */

