export function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
}
export function timeFormat(data,type) {
    const date = new Date(data);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    if (type) {
        return `${year}年${month}月${day}日`;
    }
    return `${year}-${month}-${day}`;
}

export function monthDayFormat(data,type) {
    const date = new Date(data);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    if (type) {
        return `${month}月${day}日`;
    }
    return `${month}-${day}`;
}