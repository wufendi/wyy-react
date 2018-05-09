import React, {Component} from 'react';
import {getPlaylistDetail,getCommentPlaylist} from 'api/allApisList';
import {getQueryString}  from 'utils/commonFn';
import './style.scss';
export default class Playlist extends Component {
    constructor(props){
        super(props)
        this.id = this.props.location.query?this.props.location.query.id : getQueryString('id');
        this.state = {
            coverImgUrl: '',
            name: '',
            playCount: '',
            creator: '',
            description: '',
            tags: [],
            introShowAll: false,
            tracks:[]
        }
        this.doIntroShowAll = () => {
            this.setState(...this.state,{
                introShowAll: !this.state.introShowAll
            })
        };
        this.getPlaylistDetail = () => {
            getPlaylistDetail(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    const data = resultData.result
                    this.setState(...this.state,{
                        coverImgUrl: data.coverImgUrl,
                        name:data.name,
                        playCount:data.playCount,
                        creator: data.creator,
                        tags: data.tags,
                        description: data.description,
                        tracks: data.tracks
                    })
                } else {

                }
            });
        };
    }
    componentDidMount() {
        if (this.id) {
            this.getPlaylistDetail();
        }
    }
    render() {
        const coverImgUrl = this.state.coverImgUrl;
        const creator = this.state.creator;
        const description = this.state.description;
        const tracks = this.state.tracks;
        const name = this.state.name
        const playCount = this.state.playCount
        const tags = this.state.tags;
        return (
            <div className="page playlist">
                <section className="top">
                    <div className="bg" style={{backgroundImage:`url(${coverImgUrl})`}}/>
                    <div className="wrap">
                        <div className="fl">
                            <img src={coverImgUrl} className="fl-img" alt=""/>
                            <span className="fl-desc">歌单</span>
                            <p className="count">
                                <span className="num">
                                    <i className="iconfont icon-headerset"/>
                                    {playCount}
                                </span>
                            </p>
                        </div>
                        <div className="fr">
                            <h2 className="fr-title f-brk">{name}</h2>
                            <div className="fr-user">
                               <a href={`/user?id=${creator.userId}`}>
                                   <span className="user-img">
                                       <img src={creator.avatarUrl} alt=""/>
                                   </span>
                                   {creator.nickname}
                               </a>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="intro">
                    <div>

                        {
                            tags.length ? ( <div className="tags"> 标签：{tags.map((item,index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })}</div>) :''
                        }

                        <div className={this.state.introShowAll ? 'wrap' : 'wrap fr-hidden'}>
                            简介：{description}
                        </div>
                        <span className={this.state.introShowAll ? 'iconfont icon-arrow-st':'iconfont icon-arrow-sb'} onClick={this.doIntroShowAll}/>
                    </div>
                </section>
                <div className="title">
                    歌曲列表
                </div>
                <ul className="songs-list">
                    {
                        tracks.length > 0? tracks.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div className="li-num">{index+1}</div>
                                    <div className="li-wrap">
                                        <div className="fl">
                                            <div className="song-name">{item.name}</div>
                                            <div className="song-info">
                                                {item.artists.length ? item.artists.map((subItem,subIndex)=>{
                                                    const dot = subIndex === item.artists.length - 1 ? '' : '/'
                                                    return (
                                                        <span key={subIndex}>{subItem.name} {dot} </span>
                                                    )
                                                }): '' } - {item.album.name}
                                            </div>
                                        </div>
                                        <div className="fr">
                                            <i className="iconfont icon-start"/>
                                        </div>
                                    </div>
                                    <a href={`/song?id=${item.id}`} className="hidden-a"/>
                                </li>
                            )
                        }):''
                    }
                </ul>
            </div>
        )
    }
}