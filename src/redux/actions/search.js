export const GET_HISTORY_DATA = "search/GET_HISTORY_DATA";
export const SET_HISTORY_DATA = "search/SET_HISTORY_DATA";

export function getHistoryData() {
    return {type: GET_HISTORY_DATA}
}

export function setHistoryData(data) {
    return {type: SET_HISTORY_DATA, data}
}