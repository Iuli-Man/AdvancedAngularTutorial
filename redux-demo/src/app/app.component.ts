import { Map } from 'immutable';
import { INCREMENT } from './actions';
import { IAppState } from './store';
import { NgRedux, select } from 'ng2-redux';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @select(s => s.get('counter')) count;
  // @select('counter') count;
  // @select(['messaging', 'newMessages']) newMessages;
  // @select((s: IAppState) => s.messaging.newMessages) newMessagesCount;

  constructor(private ngRedux: NgRedux<Map<string, any>>) {
  }

  increment() {
    // this.counter ++;
    this.ngRedux.dispatch({ type: INCREMENT });
  }
}
