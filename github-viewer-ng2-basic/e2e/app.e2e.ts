import { GithubViewerPage } from './app.po';

describe('github-viewer App', function() {
  let page: GithubViewerPage;

  beforeEach(() => {
    page = new GithubViewerPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('github-viewer works!');
  });
});
