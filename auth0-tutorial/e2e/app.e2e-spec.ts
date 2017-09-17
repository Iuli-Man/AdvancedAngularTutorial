import { Auth0TutorialPage } from './app.po';

describe('auth0-tutorial App', () => {
  let page: Auth0TutorialPage;

  beforeEach(() => {
    page = new Auth0TutorialPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
