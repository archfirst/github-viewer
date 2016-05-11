export class GithubViewerPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('github-viewer-app h1')).getText();
  }
}
