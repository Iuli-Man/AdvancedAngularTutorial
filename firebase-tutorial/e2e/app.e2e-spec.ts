import { FirebaseTutorialPage } from './app.po';

describe('firebase-tutorial App', () => {
  let page: FirebaseTutorialPage;

  beforeEach(() => {
    page = new FirebaseTutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
