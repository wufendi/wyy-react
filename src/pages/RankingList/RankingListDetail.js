import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getQueryString,monthDayFormat}  from 'utils/commonFn';
import {getTopList} from 'api/allApisList';
import './detail.scss';
function getBackgroundColor(idx) {
    let color = '';
    switch (idx){
        case '0':
            color = '#4cb7bc';
            break;
        case '1':
            color = '#bd5f4b';
            break;
        case '2':
            color = '#c34868';
            break;
        case '3':
            color = '#7f9ce9';
            break;
        case '4':
            color = '#4b7693';
            break;
        case '5':
            color = '#c0ddff';
            break;
        case '6':
            color = '#000';
            break;
        case '7':
            color = '#fff97d';
            break;
        case '8':
            color = '#2092e8';
            break;
        case '9':
            color = '#2e2e2e';
            break;
        case '10':
            color = '#406baf';
            break;
        case '11':
            color = '#c34868';
            break;
        case '12':
            color = '#c34868';
            break;
        case '13':
            color = '#c7dd4a';
            break;
        case '14':
            color = '#389fd9';
            break;
        case '15':
            color = '#e852b0';
            break;
        case '16':
            color = '#d93333';
            break;
        case '17':
            color = '#cca94e';
            break;
        case '18':
            color = '#fcfcfc';
            break;
        case '19':
            color = '#f1f1f1';
            break;
        case '20':
            color = '#d62c39';
            break;
        case '21':
            color = '#252525';
            break;
        case '22':
            color = '#e1ae48';
            break;
        case '23':
            color = '#be4444';
            break;
        default:
            color = '#c34868';
            break
    }
    return color;
}
export default class RankingListDetail extends Component {
    /*
    评论 commentCount
    分享 shareCount
    名称 name
    总歌曲数目 trackCount
    最近更新时间 updateTime
    收藏人数 subscribedCount
    图片 coverImgUrl
    歌曲 tracks
    播放次数 playCount
    */
    constructor(props){
        super(props);
        this.idx = getQueryString('idx');
        this.state = {
            commentCount: 0,
            shareCount:0,
            name: '',
            trackCount: 0,
            updateTime: '',
            subscribedCount: 0,
            coverImgUrl: '',
            tracks: [],
            playCount: 0,
            creator:''
        };
        this.getTopList = () => {
            getTopList(this.idx).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    const data = resultData.playlist;
                    this.setState(...this.state,{
                        commentCount: data.commentCount,
                        shareCount: data.shareCount,
                        name: data.name,
                        trackCount: data.trackCount,
                        updateTime: data.updateTime,
                        subscribedCount: data.subscribedCount,
                        coverImgUrl: data.coverImgUrl,
                        tracks: data.tracks,
                        playCount: data.playCount,
                        creator: data.creator
                    })
                } else {

                }
            })
        };
    }
    componentDidMount() {
        if (this.idx) {
            this.getTopList();
        }
    }
    render() {
        const {commentCount, shareCount, name, trackCount, updateTime, subscribedCount, coverImgUrl, tracks, playCount, creator} = this.state;
        return (
            <div className="page ranking-detail">
                {
                    this.idx ? (
                        <div>
                            <div className="top" style={{backgroundColor:getBackgroundColor(this.idx),color:(this.idx ===  '18' || this.idx ===  '19' )? 'black': ''}}>
                                <div className="wrap">
                                    <div className="fl">
                                        <img src={coverImgUrl} className="fl-img"/>
                                        <p className="count">
                                        <span className="num">
                                            <i className="iconfont icon-headerset"/>
                                            {playCount}
                                        </span>
                                        </p>
                                    </div>
                                    <div className="fr">
                                        <h2 className="fr-title f-brk">{name}</h2>
                                        <p className="update-time"> 最近更新：{monthDayFormat(updateTime,true)}</p>
                                        <div className="fr-user">
                                           <Link to={`/user?id=${creator.userId}`}>
                                               <span className="user-img">
                                                   <img src={creator.avatarUrl} alt=""/>
                                               </span>
                                                {creator.nickname}
                                                <i className="iconfont icon-arrow-r"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="footer">
                                    <div>
                                        <i className="iconfont icon-comment"/>
                                        <p>{commentCount}</p>
                                    </div>
                                    <div>
                                        <i className="iconfont icon-share"/>
                                        <p>{shareCount}</p>
                                    </div>
                                    <div>
                                        <i className="iconfont icon-music2"/>
                                       <p>{trackCount}</p>
                                    </div>
                                    <div>
                                        <i className="iconfont icon-col-list"/>
                                        <p>{subscribedCount}</p>
                                    </div>
                                </div>
                            </div>
                            <ul className="songs-list">
                                {
                                    tracks.length > 0? tracks.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="li-num">{index+1 < 10 ? `0${index+1}` : index+1}</div>
                                                <div className="li-wrap">
                                                    <div className="fl">
                                                        <div className="song-name">{item.name}
                                                            {
                                                                item.alia.length ? (item.alia.map((subItem,subIndex) => {
                                                                    return (
                                                                        <span className="sgalia" key={subIndex}>({subItem})</span>
                                                                    )
                                                                })) : ''
                                                            }
                                                        </div>
                                                        <div className="song-info">
                                                            {item.ar.length ? item.ar.map((subItem,subIndex)=>{
                                                                const dot = subIndex === item.ar.length - 1 ? '' : '/'
                                                                return (
                                                                    <span key={subIndex}>{subItem.name} {dot} </span>
                                                                )
                                                            }): '' } - {item.al.name}
                                                        </div>
                                                    </div>
                                                    <div className="fr">
                                                        <i className="iconfont icon-start"/>
                                                    </div>
                                                </div>
                                                <Link to={`/song?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    }):''
                                }
                            </ul>
                        </div>
                    ) : '暂无'
                }
            </div>
        )
    }
}