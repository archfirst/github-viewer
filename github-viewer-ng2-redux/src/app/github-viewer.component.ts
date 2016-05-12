import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { OrgViewerComponent } from './org-viewer';
import { GithubService } from './shared/services/github.service';

@Component({
    moduleId: module.id,
    selector: 'github-viewer-app',
    templateUrl: 'github-viewer.component.html',
    styleUrls: ['github-viewer.component.css'],
    directives: [OrgViewerComponent],
    providers: [HTTP_PROVIDERS, GithubService]
})
export class GithubViewerAppComponent {
    title = 'Github Viewer';

    constructor() {
    }
}
