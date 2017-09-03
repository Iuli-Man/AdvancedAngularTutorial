import { FirebaseAdvancedTutorialPage } from './app.po';

describe('firebase-advanced-tutorial App', () => {
  let page: FirebaseAdvancedTutorialPage;

  beforeEach(() => {
    page = new FirebaseAdvancedTutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
