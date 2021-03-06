import {combineReducers} from 'redux';

import counter from './reducers/counter';
import userInfo from './reducers/userInfo';
import search from './reducers/search';

export default combineReducers({
    counter,
    userInfo,
    search
});

// export default function combineReducers(state = {}, action) {
//     return {
//         counter: counter(state.counter, action),
//         userInfo: userInfo(state.userInfo, action)
//     }
// }