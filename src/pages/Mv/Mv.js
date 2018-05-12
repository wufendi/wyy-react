import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Header from 'components/Header/Header';
import Comment from 'components/Comment/Comment';
import {getMvData, getMvUrl, getSimiMv, getCommentMv} from 'api/allApisList';
import {getQueryString}  from 'utils/commonFn';
import './style.scss';
const defaultMp4 = require("file-loader!./mp4/mp4.mp4");
function durationFormat(time) {
    let min = Math.floor(time/60000);
    let sec = Math.ceil(time%60);
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    return `${min}:${sec}`;
}
export default class Mv extends Component {
    constructor(props){
        super(props);
        this.id = this.props.location.query?this.props.location.query.id : getQueryString('id') ? getQueryString('id') : 5436712;
        this.state = {
            showIntroDetail: false,
            mvData: null,
            simiMv: [],
            comments: [],
            hotComments: [],
            commentCount: 0,
            commentMore: false,
            commentsPage:0
        };
        this.doShowIntroDetail = () => {
            this.setState(...this.state,{
                showIntroDetail: !this.state.showIntroDetail
            })
        };
        this.getMvData = () => {
            getMvData(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        mvData: resultData.data
                    })
                } else {

                }
            })
        };
        this.getSimiMv = () => {
            getSimiMv(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        simiMv: resultData.mvs
                    })
                } else {

                }
            })
        };
        this.getCommentMv = (page) => {
            getCommentMv(this.id,page).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    if (page === 0) {
                        this.setState(...this.state,{
                            commentCount: resultData.total,
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
            this.getCommentMv(this.state.commentsPage+1)
        }
    }
    componentDidMount() {
        this.getMvData();
        this.getSimiMv();
        this.getCommentMv(this.state.commentsPage);
    }
    render() {
        const mvData = this.state.mvData;
        const simiMv = this.state.simiMv;
        const commentCount = this.state.commentCount;
        const hotComments = this.state.hotComments;
        const comments = this.state.comments;
        const commentMore = this.state.commentMore;
        let videoUrl = '';
        let artists = [];
        if (mvData) {
            videoUrl = mvData.brs['240'];
            artists = mvData.artists;
        }
        return (
            <div className="page mv">
                <Header title="MV"/>
                {
                    mvData ? (<div>
                        <div className="top">
                            <section>
                                <div className="bg">
                                    <video src={videoUrl} controls="controls" controlsList="nodownload" playsInline/>
                                </div>
                            </section>
                        </div>
                        <div className="content">
                            <section className="intro">
                                <h4 className="intro-title">
                                    <p className="f-brk">
                                        <span className="mv-tag">MV</span>
                                        <span className="mv-name">{mvData.name}</span>
                                        <i className={this.state.showIntroDetail ? 'iconfont icon-tri-u':'iconfont icon-tri-d'} onClick={this.doShowIntroDetail}/>
                                    </p>
                                </h4>
                                <p className="singer f-brk">
                                    歌手：{artists.length > 0 ? artists.map((item,index) => {
                                        const dot = index === artists.length - 1 ? '' : '/';
                                        return (
                                            <Link to={`/artist?id=${item.id}`} key={index}>{item.name} {dot} </Link>
                                        )
                                }) : '' }
                                </p>
                                <p className="info">
                            <span className="time">
                                发布时间：{mvData.publishTime}
                            </span>
                                    <span className="play-count">
                                播放：{mvData.playCount}
                            </span>
                                </p>
                                <p className={this.state.showIntroDetail ? 'intro-detail show':'intro-detail hide'}>
                                    炎亚纶新曲《最想去的地方》MV公开！亚纶继《1/2》后再度与陈映之导演合作，剧情主轴叙述着一段自我追寻的旅程，男孩就像自我初心的投射，在纯真互动中发现明天的坐标，迈步向前后才体悟一路的追寻正是重回原点、重拾初衷，彷似亚纶近期的心路历程。
                                </p>
                            </section>
                            <h3 className="title">
                                相关推荐
                            </h3>
                            {
                                simiMv.length > 0 ? (
                                    <ul className="mv-list">
                                        {simiMv.map((item,index) => {
                                            return (
                                                <li key={index}>
                                                    <div className="img-div">
                                                        <img src={item.cover} className="img"/>
                                                        <p className="count">
                                                            <span className="num"><i className="iconfont icon-vadio"/>{item.playCount}</span>
                                                        </p>
                                                    </div>
                                                    <article>
                                                        <h4 className="f-brk">
                                                            <span className="mv-tag f-brk">MV</span><span>{item.name}</span>
                                                        </h4>
                                                        <p className="singer f-brk">
                                                            <span className="time">{durationFormat(item.duration)}</span> by
                                                            {
                                                                item.artists.length ? item.artists.map((subItem,subIndex)=> {
                                                                    const dot = subIndex === item.artists.length - 1 ? '' : '/';
                                                                    return(
                                                                        <span key={subIndex}>{subItem.name} {dot} </span>
                                                                    )
                                                                }) : ''
                                                            }
                                                        </p>
                                                    </article>
                                                    <Link to={`/mv?id=${item.id}`} className="hidden-a"/>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : ''
                            }
                            <Comment commentCount={commentCount} hotComments={hotComments} comments={comments} commentMore={commentMore} doMoreComments={this.doMoreComments}/>
                        </div>
                    </div>): '暂无数据'
                }

            </div>
        )
    }
}