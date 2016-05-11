import { Component, OnInit } from '@angular/core';

import { RepoListComponent } from './repo-list.component';
import { Repo } from '../shared/models/repo.model';
import { GithubService } from '../shared/services/github.service';

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

    constructor(private githubService: GithubService) {
    }

    ngOnInit() {
    }

    getRepos() {
        this.githubService.getRepos(this.orgName)
            .subscribe(
                repos => {
                    this.repos = repos;
                    this.errorMessage = null;
                },
                error => {
                    this.repos = [];
                    this.errorMessage = error;
                });
    }
}
