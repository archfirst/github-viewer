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
            .select(state => state.orgName)      // <--- select with selector function
            .subscribe(orgName => {
                console.log('----- orgNameSubscription -----');
                console.log('orgname:', orgName);
                console.log('state.orgName:', this.ngRedux.getState().orgName);
                this.getRepos(orgName);
            });

        this.errorMessageSubscription = this.ngRedux
            .select('errorMessage')              // <--- select with key
            .subscribe(errorMessage => {
                console.log('----- errorMessageSubscription -----');
                console.log('errorMessage:', errorMessage);
                console.log('state.errorMessage:', this.ngRedux.getState().errorMessage);
                if (typeof errorMessage === 'undefined') return;
                // this.errorMessage = errorMessage;
                this.repos = [];
            });

        this.reposSubscription = this.ngRedux
            .select('repos')                     // <--- select with key
            .subscribe(repos => {
                console.log('----- reposSubscription -----');
                console.log('repos:', repos);
                console.log('state.repos:', this.ngRedux.getState().repos);
                if (typeof repos === 'undefined') return;
                // this.repos = repos;
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
        // For some reason, ng2-redux is sometimes sending orgName as undefined
        if (typeof orgName === 'undefined' || orgName === null) return;

        this.githubService.getRepos(orgName)
            .subscribe(
                repos => this.ngRedux.dispatch(createActionReceiveRepos(repos)),
                error => this.ngRedux.dispatch(createActionReceiveErrorMessage(error)));
    }
}
