import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import surgeImg from './imgs/bsb.jpg'; // 飙升榜
import newSongImg from './imgs/xgb.jpg'; // 新歌榜
import originalImg from './imgs/ycb.jpg'; // 原创榜
import hotSongImg from './imgs/rgb.jpg'; // 热歌榜
import singerRank from './imgs/singerRank.jpg'; // 歌手榜
import electronicSongImg from './imgs/dyb.jpg'; // 电音
import hipHopImg from './imgs/hiphop.jpg'; // 嘻哈
import acgImg from './imgs/acg.jpg'; // ACG音乐
import electricPowerImg from './imgs/xdb.jpg'; // 新电力
import beatPortImg from './imgs/dzdance.jpg'; // Beatport全球电子舞曲
import japanImg from './imgs/japan.jpg'; // 日本Oricon周榜
import classicalImg from './imgs/classical.jpg'; // 古典音乐
import ukImg from './imgs/ukb.jpg'; // UK排行榜周榜
import billboardImg from './imgs/billboard.jpg'; // 美国billboard周榜
import frenchImg from './imgs/french.jpg'; // 法国NRJ Vos Hits 周榜
import itunesImg from './imgs/itunes.jpg'; // itunes榜
import hitFmImg from './imgs/hitFm.jpg'; // Hit FM Top榜
import ukBangImg from './imgs/englandQbang.jpg'; // 英国Q杂志中文版周榜
import electronicSportsImg from './imgs/djb.jpg'; // 电竞音乐榜
import ktvImg from './imgs/ktv.jpg'; // KTV唛榜
import taiWanImg from './imgs/tailand.jpg'; // 台湾Hito排行榜
import hongKongImg from './imgs/hongkong.jpg'; // 中国TOP排行榜（港台榜）
import chinaImg from './imgs/china.jpg'; // 中国TOP排行榜（内地榜）
import hkChina from './imgs/hkChina.jpg'; // 香港电台中文歌曲龙虎榜
import chinaHipHopImg from './imgs/chinaHiphop.jpg'; // 中国嘻哈榜
import "./style.scss";
const officialList = [
    { img: surgeImg, name: '飙升榜', refreshTime: '每天更新',idx:3},
    { img: newSongImg, name: '新歌榜', refreshTime: '每天更新',idx:0},
    { img: originalImg, name: '原创榜', refreshTime: '刚刚更新',idx: 2},
    { img: hotSongImg, name: '热歌榜', refreshTime: '刚刚更新',idx: 1},
    { img: singerRank, name: '歌手榜', refreshTime: '每天更新', isSing: true}
];
const globalList = [
    { img: electronicSongImg, name: '电音榜', refreshTime: '每周五更新',idx: 12},
    { img: hipHopImg, name: '嘻哈榜', refreshTime: '每周五更新',idx: 23},
    { img: acgImg, name: 'ACG音乐榜', refreshTime: '刚刚更新',idx: 22},
    { img: electricPowerImg, name: '新电力榜', refreshTime: '每周五更新',idx: 4}, // 韩国Mnet排行榜周榜 *****
    { img: beatPortImg, name: 'Beatport全球电子舞曲榜', refreshTime: '刚刚更新',idx: 21},
    { img: japanImg, name: '日本Oricon周榜', refreshTime: '每周三更新',idx: 10},
    { img: classicalImg, name: '古典音乐榜', refreshTime: '刚刚更新',idx: 17},// 华语金曲榜
    { img: ukImg, name: 'UK排行榜周榜', refreshTime: '每周一更新',idx: 5},
    { img: billboardImg, name: '美国billboard周榜', refreshTime: '每周三更新',idx: 6},
    { img: frenchImg, name: '法国NRJ Vos Hits 周榜', refreshTime: '每周五更新',idx: 19},
    { img: itunesImg, name: 'iTunes榜', refreshTime: '每周一更新',idx: 8},
    { img: hitFmImg, name: 'Hit FM Top榜', refreshTime: '每周一更新',idx: 9},
    { img: ukBangImg, name: '英国Q杂志中文版周榜', refreshTime: '每周三更新',idx: 5},// UK排行榜周榜
    { img: electronicSportsImg, name: '电竞音乐榜', refreshTime: '每周五更新',idx: 13}, // 韩国melon原生周榜 ****
    { img: ktvImg, name: 'KTV唛榜', refreshTime: '每周五更新',idx: 7},
    { img: taiWanImg, name: '台湾Hito排行榜', refreshTime: '每周一更新',idx: 20},
    { img: hongKongImg, name: '中国TOP排行榜（港台榜）', refreshTime: '每周一更新',idx: 14},
    { img: chinaImg, name: '中国TOP排行榜（内地榜）', refreshTime: '每周一更新',idx: 15},
    { img: hkChina, name: '香港电台中文歌曲龙虎榜', refreshTime: '每周五更新',idx: 16},
    { img: chinaHipHopImg, name: '中国嘻哈榜', refreshTime: '每周五更新',idx: 18}
];
export default class RankingList extends Component {
    render() {
        return (
            <div className="page hot-song-page">
                <h2 className="title">官方榜</h2>
                <ul>
                    {
                        officialList.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div className="img-div">
                                        <img src={item.img} alt={item.name}/>
                                        <div className="refresh-time">{item.refreshTime}</div>
                                    </div>
                                    <div className="des">
                                        {item.name}
                                    </div>
                                    {/*<Link to={`/rankingListDetail?idx=${item.idx}`} className="hidden-a"/>*/}
                                    {
                                        item.isSing ? (<Link to={`/singerRankingList`} className="hidden-a"/>):(<Link to={`/rankingListDetail?idx=${item.idx}`} className="hidden-a"/>)
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
                <h2 className="title">全球榜</h2>
                <ul>
                    {
                        globalList.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div className="img-div">
                                        <img src={item.img} alt={item.name}/>
                                        <div className="refresh-time">{item.refreshTime}</div>
                                    </div>
                                    <div className="des">
                                        {item.name}
                                    </div>
                                    <Link to={`/rankingListDetail?idx=${item.idx}`} className="hidden-a"/>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}