import { ReduxExercisePage } from './app.po';

describe('redux-exercise App', () => {
  let page: ReduxExercisePage;

  beforeEach(() => {
    page = new ReduxExercisePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
