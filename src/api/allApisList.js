import fetch from 'utils/fetch';
const pref = 'wyy';

/**
 * 精品歌单
 * @param limit - 必选参数 歌单数量
 * @param cat - 可选参数 : cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 " 全部 "
 */
export function playListHighQuality (limit=20,cat='全部') { // id=24381616
    return fetch({
        url:`${pref}/top/playlist/highquality?limit=${limit}&cat=${cat}`,
        method: 'get'
    })
}

/**
 * 歌单详情
 * 说明：歌单能看到歌单名字 , 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐
 * @param id - 必选参数 歌单id
 */
export function playlistDetail (id=24381616) {
    return fetch({
        url: `${pref}/playlist/detail?id=${id}`,
        method: 'get'
    })
}

/**
 * 获取音乐 url
 * 说明：使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口 , 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url( 不需要登录 )
 * @param id - 必选参数  音乐id
 */
export function musicUrl (id=33894312 ) {
    return fetch({
        url: `${pref}/music/url?id=${id}`,
        method: 'get'
    })
}
/**
 * 获取歌曲详情
 * 说明：调用此接口 , 传入音乐 id, 可获得歌曲详情
 * @param ids - 必选参数  音乐ids
 */
export function songDetail (ids=347230 ) {
    return fetch({
        url: `${pref}/song/detail?ids=${ids}`,
        method: 'get'
    })
}

/**
 * 搜索
 * 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /music/url 接口传入歌曲 id 获取具体的播放链接
 * @param keywords  - 必选参数  关键词
 * @param limit - 可选参数 返回数量 , 默认为 30
 * @param offset -可选参数  偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param type - 可选参数 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
 */
export function search (keywords ='周杰伦', limit = 10, offset = 1, type =1 ) {
    return fetch({
        url: `${pref}/search?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`,
        method: 'get'
    })
}

/**
 * 搜索建议
 * 说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
 * @param keywords  - 必选参数  关键词
 * @param limit - 可选参数 返回数量 , 默认为 30
 * @param offset -可选参数  偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param type - 可选参数 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
 */
export function searchSuggest (keywords ='周杰伦', offset = 1, limit = 10, type =1 ) {
    return fetch({
        url: `${pref}/search/suggest?keywords=${keywords}&limit=${limit}&offset=${offset}&type=${type}`,
        method: 'get'
    })
}

/**
 * 热门歌手
 * 说明 : 调用此接口 , 可获取热门歌手数据
 * @param limit - 可选参数 返回数量 , 默认为 30
 * @param offset -可选参数  偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export function topArtists (limit = 10, offset = 0) {
    return fetch({
        url: `${pref}/top/artists?limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param id: 必选参数 专辑 id
 */
export function getAlbum (id=32311) {
    return fetch({
        url: `${pref}/album?id=${id}`,
        method: 'get'
    })
}
/**
 * 专辑评论
 * 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要 登录 )
 * @param id: 必选参数 专辑 id
 * @param limit - 可选参数 返回数量 , 默认为 30
 * @param offset -可选参数  偏移数量，用于分页 ,如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 */
export function getCommentAlbum (id=32311, offset = 0, limit = 20) {
    return fetch({
        url: `${pref}/comment/album?id=${id}&limit=${limit}&offset=${offset}`,
        method: 'get'
    })
}
/**
 * 获取歌手单曲
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * @param id: 必选参数 歌手 id, 可由搜索接口获得
 */
export function getArtistsSong (id=6452) {
    return fetch({
        url: `${pref}/artists?id=${id}`,
        method: 'get'
    })
}
