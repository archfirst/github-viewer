import * as Redux from 'redux';
const {combineReducers} = Redux;

import { AppState } from './app.state';
import githubReducer from './github.reducer';

export const rootReducer = combineReducers<AppState>({
    githubReducer
});

export { AppState, initialState } from './app.state';
