import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './../actions';
import { IAppState } from './../store';
import { NgRedux, select } from 'ng2-redux';
import { Component } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  @select('todos') todos: Array<any>;

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  addTodo(input) {
    if (!input.value) return; 

    this.ngRedux.dispatch({
      type: ADD_TODO, 
      item: { title: input.value, isCompleted: false 
    }});

    input.value = '';
  }

  toggleTodo(todo) {
    this.ngRedux.dispatch({
      type: TOGGLE_TODO,
      item: todo
    })
  }

  removeTodo(todo) {
    this.ngRedux.dispatch({type: REMOVE_TODO, item: todo});
  }
}
