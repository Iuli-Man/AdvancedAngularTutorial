import { CLEAR_TODOS } from './../actions';
import { NgRedux, select } from 'ng2-redux';
import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { IAppState } from '../store';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {
  @select('todoCounter') todos: number;
  @select('lastUpdate') lastUpdate: Date;
  
  // Read the comment in TodoService
  constructor(private ngRedux: NgRedux<IAppState>) { 

  }

  clearTodos() {
    this.ngRedux.dispatch({ type: CLEAR_TODOS });
  }
}
