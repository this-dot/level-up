import { LevelUpPage } from './app.po';

describe('level-up App', () => {
  let page: LevelUpPage;

  beforeEach(() => {
    page = new LevelUpPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
