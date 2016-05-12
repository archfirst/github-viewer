import { AppState, initialState } from './app.state';
import { CHANGE_ORG_NAME, RECEIVE_ERROR_MESSAGE, RECEIVE_REPOS } from '../actions/github.actions';

export default (state: AppState = initialState, action: any) => {

    console.log('reducer - action:', action);

    let nextState: AppState = null;
    switch (action.type) {
        case CHANGE_ORG_NAME:
            nextState = Object.assign({}, state, {
                orgName: action.orgName
            });
            break;

        case RECEIVE_ERROR_MESSAGE:
            nextState = Object.assign({}, state, {
                errorMessage: action.errorMessage,
                repos: []
            });
            break;

        case RECEIVE_REPOS:
            nextState = Object.assign({}, state, {
                errorMessage: null,
                repos: action.repos
            });
            break;

        default:
            nextState = state;
            break;
    }

    return nextState;
}
