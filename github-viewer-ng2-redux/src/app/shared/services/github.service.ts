import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Repo } from '../models/repo.model';

@Injectable()
export class GithubService {

    constructor(private http: Http) {
    }

    private orgsUrl = 'https://api.github.com/orgs/';

    getRepos(orgName: string): Observable<Repo[]> {
        return this.http
            .get(this.orgsUrl + orgName + '/repos?per_page=100')
            .map(response => this.extractData(response))
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let repos = <Repo[]>res.json();

        // Sort repos in descending order of stars
        repos.sort(function (repo1, repo2) {
            return repo2.stargazers_count - repo1.stargazers_count;
        });

        return repos;
    }

    private handleError(errorResponse: Response) {
        let body = errorResponse.json();
        let message = body.message ?
            body.message :
            (errorResponse.statusText || 'unknown error');
        return Observable.throw(message);
    }
}
