import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Subscription } from 'rxjs';

import { RepoListComponent } from './repo-list.component';
import {
    createActionChangeOrgName,
    createActionReceiveErrorMessage,
    createActionReceiveRepos
} from '../shared/actions/github.actions';
import { Repo } from '../shared/models/repo.model';
import { GithubService } from '../shared/services/github.service';
import { AppState } from '../shared/reducers/app.state';

@Component({
    moduleId: module.id,
    selector: 'app-org-viewer',
    templateUrl: 'org-viewer.component.html',
    styleUrls: ['org-viewer.component.css'],
    directives: [RepoListComponent]
})
export class OrgViewerComponent implements OnInit {
    orgName: string;
    errorMessage: string;
    repos: Repo[] = [];

    private orgNameSubscription: Subscription;
    private errorMessageSubscription: Subscription;
    private reposSubscription: Subscription;

    constructor(private githubService: GithubService,
                private ngRedux: NgRedux<AppState>) {
    }

    ngOnInit() {
        this.orgNameSubscription = this.ngRedux
            .select<string>(state => {
                return state.githubReducer.orgName;
            })        // <--- select with selector function
            .subscribe(orgName => {
                console.log('----- orgNameSubscription -----');
                console.log('orgname:', orgName);
                console.log('state.orgName:', this.ngRedux.getState().githubReducer.orgName);
                if (typeof orgName === 'undefined') {
                    console.error('TODO: Why is ng2-redux ever sending a value of undefined?');
                    return;
                }
                this.getRepos(orgName);
            });

        this.errorMessageSubscription = this.ngRedux
            .select<string>('errorMessage')                // <--- select with key
            .subscribe(errorMessage => {
                console.log('----- errorMessageSubscription -----');
                console.log('errorMessage:', errorMessage);
                console.log('state.errorMessage:', this.ngRedux.getState().githubReducer.errorMessage);
                if (typeof errorMessage === 'undefined') {
                    console.error('TODO: Why is ng2-redux ever sending a value of undefined?');
                    return;                    
                }
                this.errorMessage = errorMessage;
                this.repos = [];
            });

        this.reposSubscription = this.ngRedux
            .select<Repo[]>(n=>n.githubReducer.repos)                       // <--- select with key
            .subscribe(repos => {
                console.log('----- reposSubscription -----');
                console.log('repos:', repos);
                console.log('state.repos:', this.ngRedux.getState().githubReducer.repos);
                if (typeof repos === 'undefined') {
                    console.error('TODO: Why is ng2-redux ever sending a value of undefined?');
                    return;                    
                }
                this.repos = repos;
                this.errorMessage = null;
            })
    }

    ngOnDestroy() {
        this.orgNameSubscription.unsubscribe();
        this.errorMessageSubscription.unsubscribe();
        this.reposSubscription.unsubscribe();
    }

    handleOrgFormSubmit() {
        this.ngRedux.dispatch(createActionChangeOrgName(this.orgName));
    }

    getRepos(orgName) {
        if (orgName === null) return;

        this.githubService.getRepos(orgName)
            .subscribe(
                repos => this.ngRedux.dispatch(createActionReceiveRepos(repos)),
                error => this.ngRedux.dispatch(createActionReceiveErrorMessage(error)));
    }
}
