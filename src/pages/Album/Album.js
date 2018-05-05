import React, {Component} from 'react';
import {getAlbum, getCommentAlbum} from 'api/allApisList';
import './style.scss';
function timeFormat(data,type) {
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

export default class Album extends Component {
    constructor(props){
        super(props)
        this.id = this.props.location.query?this.props.location.query.id : '';
        this.state = {
            blurPicUrl: '',
            picUrl: '',
            albumName: '',
            singerName: '',
            singerId: '',
            description: '',
            publishTime: 0,
            commentCount: 0,
            introShowAll: false,
            songs:[],
            comments: [],
            hotComments: [],
            commentMore: false,
            commentsPage:0
        }
        this.doIntroShowAll = () => {
            this.setState(...this.state,{
                introShowAll: !this.state.introShowAll
            })
        }
        this.getAlbum = () => {
            getAlbum(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                   const album = resultData.album
                   this.setState(...this.state,{
                       blurPicUrl: album.blurPicUrl,
                       picUrl: album.picUrl,
                       albumName: album.name,
                       singerName: album.artist.name,
                       singerId: album.artist.id,
                       description: album.description,
                       publishTime: album.publishTime,
                       commentCount: album.info.commentCount,
                       songs: resultData.songs
                   })
                } else {

                }
            });
        }
        this.getCommentAlbum = (page) => {
            getCommentAlbum(this.id,page).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    if (page === 0) {
                        this.setState(...this.state,{
                            comments: resultData.comments,
                            hotComments: resultData.hotComments,
                            commentMore: resultData.more,
                            commentsPage: page
                        });
                    } else {
                        const comments = this.state.comments.concat(resultData.comments);
                        this.setState(...this.state,{
                            comments: comments,
                            commentMore: resultData.more,
                            commentsPage: page
                        })
                    }
                } else {

                }
            });
        };
        this.doDetail = (type,id) => {
            this.props.history.push({
                pathname: `/${type}`,
                query: {id: id},
            });
        };
        this.doMoreComments = () => {
            this.getCommentAlbum(this.state.commentsPage+1)
        }
    }
    componentDidMount() {
        if (this.id) {
            this.getAlbum();
            this.getCommentAlbum(this.state.commentsPage);
        }
    }
    render() {
        const blurPicUrl = this.state.blurPicUrl;
        const picUrl = this.state.picUrl;
        const albumName = this.state.albumName;
        const singerName = this.state.singerName;
        const singerId = this.state.singerId;
        const description = this.state.description;
        const publishTime = timeFormat(this.state.publishTime);
        const commentCount = this.state.commentCount;
        const songs = this.state.songs;
        const hotComments = this.state.hotComments;
        const comments = this.state.comments;
        const commentMore = this.state.commentMore;
        return (
            <div className="page">
                <section className="top">
                    <div className="bg" style={{backgroundImage:`url(${blurPicUrl})`}}/>
                    <div className="wrap">
                        <div className="fl">
                            <span className="fl-bg"/>
                            <img src={picUrl} className="fl-img" alt=""/>
                            <span className="fl-desc">专辑</span>
                        </div>
                        <div className="fr">
                            <h2 className="fr-title">{albumName}</h2>
                            <div className="fr-singer">
                                歌手：
                                <span className="fr-singer-name" onClick={() => this.doDetail('artist',singerId)}> <a href="javascript:;">{singerName}</a></span>
                            </div>
                            <div className="fr-time">
                                发行时间：<span>{publishTime}</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="intro">
                    <div>
                        <div className={this.state.introShowAll ? 'wrap' : 'wrap fr-hidden'}>
                            {description}
                        </div>
                        <span className={this.state.introShowAll ? 'iconfont icon-arrow-st':'iconfont icon-arrow-sb'} onClick={this.doIntroShowAll}/>
                    </div>
                </section>
                <div className="title">
                    歌曲列表
                </div>
                <ul className="songs-list">
                    {
                        songs.length > 0? songs.map((item,index) => {
                            return (
                                <li key={index} onClick={() => this.doDetail('song',item.id)}>
                                    <div className="li-num">{index+1}</div>
                                    <div className="li-wrap">
                                        <div className="fl">
                                            <div className="song-name">{item.name}</div>
                                            <div className="song-info">
                                                {item.ar[0].name} - {item.alia[0]}
                                            </div>
                                        </div>
                                        <div className="fr">
                                            <i className="iconfont icon-start"/>
                                        </div>
                                    </div>
                                </li>
                            )
                        }):''
                    }
                </ul>
                {
                    hotComments.length > 0 ? (<div className="hot-comments">
                        <div className="title">
                            热门评论
                        </div>
                        <ul className="comment-list">
                            {
                                hotComments.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <div className="cmt-head">
                                                <a className="photo" href="#">
                                                    <img src= {item.user.avatarUrl} alt=""/></a>
                                            </div>
                                            <div className="cmt-wrap">
                                                <div className="cmt-header">
                                                    <div className="cmt-meta">
                                                        <div className="cmt-user">
                                                            <a href="#">{item.user.nickname}</a>
                                                        </div>
                                                        <div className="cmt-time">
                                                            {timeFormat(item.time, true)}
                                                        </div>
                                                    </div>
                                                    <div className="cmt-like">
                                                        <div className="cmt-likearea">
                                                            {item.likedCount} <i className="iconfont icon-good"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="cmt-content">
                                <span className="xmt-text">
                                    {item.content}
                                </span>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>) : ''
                }
                {
                    comments.length > 0 ? (
                        <div className="comments">
                            <div className="title">
                                精彩评论
                            </div>
                            <ul className="comment-list">
                                {
                                    comments.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="cmt-head">
                                                    <a className="photo" href="#">
                                                        <img src= {item.user.avatarUrl} alt=""/></a>
                                                </div>
                                                <div className="cmt-wrap">
                                                    <div className="cmt-header">
                                                        <div className="cmt-meta">
                                                            <div className="cmt-user">
                                                                <a href="#">{item.user.nickname}</a>
                                                            </div>
                                                            <div className="cmt-time">
                                                                {timeFormat(item.time, true)}
                                                            </div>
                                                        </div>
                                                        <div className="cmt-like">
                                                            <div className="cmt-likearea">
                                                                {item.likedCount} <i className="iconfont icon-good"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cmt-content">
                                <span className="xmt-text">
                                    {item.content}
                                </span>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                {
                    commentMore ?  (<div className="comment-more">
                    <span className="box" onClick={this.doMoreComments}>
                        查看全部 {commentCount} 条评论 <i className="iconfont icon-arrow-r"/>
                    </span>
                    </div>) : ''
                }
            </div>
        )
    }
}