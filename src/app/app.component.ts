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
      name: 'Hold the Line',
      status: TaskStatus.complete,
      create: new Date().toISOString(),
    },
    {
      name: 'Bless the rains down in Africa',
      status: TaskStatus.incomplete,
      create: new Date().toISOString(),
    }
  ];
  public incompleteTasks: Array<Task> = [];
  public completeTasks: Array<Task> = [];
  public sortMode = 'Alphabetically';

  constructor() {
    this.incompleteTasks = this.tasks.filter(task => task.status === TaskStatus.incomplete);
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);
  }

  // tasksOfStatus(status) {
  //   return tasks => tasks.filter(task => task.status === status);
  // }

  // ANONYMOUS FUNCTIONS
  filterTasks() {
    this.incompleteTasks = this.tasks.filter(task => task.status === 'incomplete'); // THIS WILL FAIL
    this.completeTasks = this.tasks.filter(task => task.status === TaskStatus.complete);

    // this.incompleteTasks = this.tasks.filter(this.isIncomplete);
  }

  // TOTO: Tomorrow let's go through and refactor into the good ways

  // isIncomplete(task) {
  //   return task.status === 'INCOMPLETE';
  // }

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

  changeSortMode() {
    if (this.sortMode === 'Alphabetically') {
      this.sortMode = 'Date';
    } else {
      this.sortMode = 'Alphabetically';
    }
  }

  // TDD THIS SORT TASKS THING
  sortTasks() {
    this.tasks.sort((a: Task, b: Task) => {
      if (this.sortMode === 'Alphabetically') {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      } else if (this.sortMode === 'Date') {
        if (new Date(a.create).getTime() < new Date(b.create).getTime()) {
          return -1;
        } else {
          return 1;
        }
      }
    });
    this.filterTasks();
  }

  addTask() {
    const newTaskInput = this.newTaskInput.nativeElement.value;
    const newTask = { name: newTaskInput, status: TaskStatus.incomplete, create: new Date().toISOString() };
    this.tasks.push(newTask);
    this.filterTasks();
  }
}

export interface Task {
  name: string;
  status: string;
  create: string;
}

enum TaskStatus {
  complete = 'COMPLETE',
  incomplete = 'INCOMPLETE',
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

