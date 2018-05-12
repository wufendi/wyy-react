import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from 'components/Header/Header';
import Comment from 'components/Comment/Comment';
import {getAlbum, getCommentAlbum} from 'api/allApisList';
import {getQueryString, timeFormat}  from 'utils/commonFn';
import './style.scss';
export default class Album extends Component {
    constructor(props){
        super(props)
        this.id = this.props.location.query?this.props.location.query.id : getQueryString('id');
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
        };
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
        };
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
        this.doMoreComments = () => {
            this.getCommentAlbum(this.state.commentsPage+1)
        };
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
            <div className="page album">
                <Header title={singerName}/>
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
                                <span className="fr-singer-name"> <Link to={`/artist?id=${singerId}`}>{singerName}</Link></span>
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
                                <li key={index}>
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
                                    <Link to={`/song?id=${item.id}`} className="hidden-a"/>
                                </li>
                            )
                        }):''
                    }
                </ul>
                <Comment commentCount={commentCount} hotComments={hotComments} comments={comments} commentMore={commentMore} doMoreComments={this.doMoreComments}/>
            </div>
        )
    }
}