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
import { AppState } from '../shared/reducers/index';

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
            .select<string>(state => state.githubReducer.orgName)
            .subscribe(orgName => {
                console.log('orgNameSubscription:', orgName);
                this.getRepos(orgName);
            });

        this.errorMessageSubscription = this.ngRedux
            .select<string>(state => state.githubReducer.errorMessage)
            .subscribe(errorMessage => {
                console.log('errorMessageSubscription:', errorMessage);
                this.errorMessage = errorMessage;
            });

        this.reposSubscription = this.ngRedux
            .select<Repo[]>(state => state.githubReducer.repos)
            .subscribe(repos => {
                console.log('reposSubscription:', repos);
                this.repos = repos;
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
