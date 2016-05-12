import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Repo } from '../shared/models/repo.model';

@Component({
    moduleId: module.id,
    selector: 'app-repo-list',
    templateUrl: 'repo-list.component.html',
    styleUrls: ['repo-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepoListComponent implements OnInit {

    @Input() repos: Repo[];

    constructor() {
    }

    ngOnInit() {
    }
}
