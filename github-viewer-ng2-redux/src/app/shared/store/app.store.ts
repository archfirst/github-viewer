import { createStore } from 'redux';

import reducer from '../reducers/index';

export const createStoreInstance = () => {
    return createStore(reducer);
};
