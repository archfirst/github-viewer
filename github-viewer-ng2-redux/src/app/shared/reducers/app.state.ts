import { Repo } from '../models/repo.model';

export class AppState {
    githubReducer: {
        orgName: string;
        errorMessage: string;
        repos: Repo[];
    }
}

 

export const initialState: AppState = {
    githubReducer: {
        orgName: null,
        errorMessage: null,
        repos:[]
    }
};
