import {
    beforeEachProviders,
    describe,
    expect,
    it,
    inject
} from '@angular/core/testing';
import { GithubViewerAppComponent } from '../app/github-viewer.component';

beforeEachProviders(() => [GithubViewerAppComponent]);

describe('App: GithubViewer', () => {
    it('should create the app',
        inject([GithubViewerAppComponent], (app: GithubViewerAppComponent) => {
            expect(app).toBeTruthy();
        }));

    it('should have as title \'github-viewer works!\'',
        inject([GithubViewerAppComponent], (app: GithubViewerAppComponent) => {
            expect(app.title).toEqual('github-viewer works!');
        }));
});
