import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO, CLEAR_TODOS } from './actions';
import { tassign } from 'tassign';

export interface IAppState {
    todos: Array<any>;
    todoCounter: number;
    lastUpdate: Date;
    idCounter: number;
}

export const INITIAL_STATE: IAppState = {
    todos: [],
    todoCounter: 0,
    lastUpdate: null,
    idCounter: 0
}

export function rootReducer(state: IAppState, action): IAppState {
    let newState = tassign(state, { lastUpdate: new Date() });
    switch (action.type) {
        case ADD_TODO:
            newState.todoCounter = state.todoCounter + 1;
            newState.idCounter = state.idCounter + 1;
            action.item.id = newState.idCounter;
            newState.todos = state.todos.concat(action.item);
            return newState;
        case REMOVE_TODO:
            newState.todoCounter = state.todoCounter - 1;
            newState.todos = state.todos.filter(item => item.id != action.item.id);
            return newState;
        case CLEAR_TODOS:
            newState.todoCounter = 0;
            newState.todos = [];
            return newState;
        case TOGGLE_TODO:
            let item = state.todos.find(i => i.id === action.item.id);
            let index = state.todos.indexOf(action.item);
            let updatedItem = tassign(item, { isCompleted: !item.isCompleted });
            let beforeItems = state.todos.slice(0, index);
            let afterItems = state.todos.slice(index + 1);
            newState.todos = [...beforeItems, updatedItem, ...afterItems];
            return newState;
    }
    return state;
}