import { ApplicationRef, Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs';

import { OrgViewerComponent } from './org-viewer';
import { AppState } from './shared/reducers/app.state';
import { GithubService } from './shared/services/github.service';

@Component({
    moduleId: module.id,
    selector: 'github-viewer-app',
    templateUrl: 'github-viewer.component.html',
    styleUrls: ['github-viewer.component.css'],
    directives: [OrgViewerComponent],
    providers: [HTTP_PROVIDERS, GithubService]
})
export class GithubViewerAppComponent implements OnInit {
    title = 'Github Viewer';
    
    private unsubscribeNgRedux: () => void;

    constructor(private applicationRef: ApplicationRef, private ngRedux: NgRedux<AppState>) {
    }

    ngOnInit() {
        // Subscribe to the ngRedux store for general debugging
        this.unsubscribeNgRedux = this.ngRedux.subscribe(() => {
            console.log('----- ng2ReduxSubscription -----');
            console.log('state:', this.ngRedux.getState());
            this.applicationRef.tick();  // <--- TODO: Why do we need to trigger change detection here?
        });
    }

    ngOnDestroy() {
        this.unsubscribeNgRedux();
    }
}
