import { FirebaseAuthenticationPage } from './app.po';

describe('firebase-authentication App', () => {
  let page: FirebaseAuthenticationPage;

  beforeEach(() => {
    page = new FirebaseAuthenticationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
