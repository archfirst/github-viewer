import * as Redux from 'redux';
const {combineReducers} = Redux;

import { AppState } from './app.state.ts';
import githubReducer from './github.reducer';

const rootReducer = combineReducers<AppState>({
    githubReducer
});

export default rootReducer;
