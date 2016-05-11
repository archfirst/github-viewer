import { Repo } from '../models/repo.model';

export class AppState {
    orgName: string;
    errorMessage: string;
    repos: Repo[];
}

export const initialState: AppState = {
    orgName: null,
    errorMessage: null,
    repos: []
};
