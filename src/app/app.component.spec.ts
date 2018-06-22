import { TestBed, async } from '@angular/core/testing';
import { TaskStatus } from './task.interface';
import { AppComponent } from './app.component';
describe('Todo App', () => {
  let fixture;
  let app;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  describe('filterTasks', () => {
    beforeEach(() => {
      app.tasks = [
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
    });
    it('should filter the tasks down to incomplete and complete tasks', () => {
      app.filterTasks();

      expect(app.incompleteTasks.length).toBe(2);
      expect(app.completeTasks.length).toBe(1);
    });
    it('should filter incomplete tasks to all be incomplete', () => {
      app.filterTasks();

      expect(app.incompleteTasks.every(task => task.status === TaskStatus.incomplete)).toBe(true);
    });
  });
});
