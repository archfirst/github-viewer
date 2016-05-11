import * as Redux from 'redux';

/* ----- Action Types & Action Creators ----- */

export const CHANGE_ORG_NAME: string = 'CHANGE_ORG_NAME';
export var createActionChangeOrgName = (orgName) => {
    return <Redux.Action>{
        type: CHANGE_ORG_NAME,
        orgName: orgName
    };
};

export const RECEIVE_ERROR_MESSAGE: string = 'RECEIVE_ERROR_MESSAGE';
export var createActionReceiveErrorMessage = (errorMessage) => {
    return <Redux.Action>{
        type: RECEIVE_ERROR_MESSAGE,
        errorMessage: errorMessage
    };
};

export const RECEIVE_REPOS: string = 'RECEIVE_REPOS';
export var createActionReceiveRepos = (repos) => {
    return <Redux.Action>{
        type: RECEIVE_REPOS,
        repos: repos
    };
};
