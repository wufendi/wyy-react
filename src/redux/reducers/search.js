import {GET_HISTORY_DATA, SET_HISTORY_DATA} from '../actions/search';

/*
* 初始化state
 */

const initState = {
    historyData: []
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case GET_HISTORY_DATA:
            return {
                historyData: state.historyData
            };
        case SET_HISTORY_DATA:
            return {
                ...state,
                historyData: action.data
            };
        default:
            return state
    }
}