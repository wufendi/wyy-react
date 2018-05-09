import React, {Component} from 'react';
import {timeFormat}  from 'utils/commonFn';
import './style.scss';

export default class Comment extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {commentCount, hotComments, comments, commentMore, doMoreComments } = this.props;
        return (
            <div className="comment-compontent">
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
                                                <a className="photo" href={`/user?id=${item.user.userId}`}>
                                                    <img src= {item.user.avatarUrl} alt=""/></a>
                                            </div>
                                            <div className="cmt-wrap">
                                                <div className="cmt-header">
                                                    <div className="cmt-meta">
                                                        <div className="cmt-user">
                                                            <a href={`/user?id=${item.user.userId}`}>{item.user.nickname}</a>
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
                                                                <span className="cmt-text">
                                                                       {item.beReplied.length ? (<span>回复<a href={`/user?id=${item.beReplied[0].user.userId}`}>@{item.beReplied[0].user.nickname}</a>：{item.content}</span>) : item.content}
                                                                </span>
                                                </div>
                                                {
                                                    item.beReplied.length ? (item.beReplied.map((subItem,subIndex)=> {
                                                        return(
                                                            <div className="cmt-replay" key={subIndex}>
                                                                <span className="cmt-replay-user">@{subItem.user.nickname}：</span>
                                                                <span className="cmt-replay-cnt">{subItem.content}</span>
                                                            </div>
                                                        );
                                                    })): ''
                                                }

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
                                                    <a className="photo" href={`/user?id=${item.user.userId}`}>
                                                        <img src= {item.user.avatarUrl} alt=""/></a>
                                                </div>
                                                <div className="cmt-wrap">
                                                    <div className="cmt-header">
                                                        <div className="cmt-meta">
                                                            <div className="cmt-user">
                                                                <a href={`/user?id=${item.user.userId}`}>{item.user.nickname}</a>
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
                                                                    <span className="cmt-text">
                                                                       {item.beReplied.length ? (<span>回复<a href={`/user?id=${item.beReplied[0].user.userId}`}>@{item.beReplied[0].user.nickname}</a>：{item.content}</span>) : item.content}
                                                                   </span>
                                                    </div>
                                                    {
                                                        item.beReplied.length ? (item.beReplied.map((subItem,subIndex)=> {
                                                            return(
                                                                <div className="cmt-replay" key={subIndex}>
                                                                    <span className="cmt-replay-user">@{subItem.user.nickname}：</span>
                                                                    <span className="cmt-replay-cnt">{subItem.content}</span>
                                                                </div>
                                                            );
                                                        })): ''
                                                    }
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
                    <span className="box" onClick={doMoreComments}>
                        查看全部 {commentCount} 条评论 <i className="iconfont icon-arrow-r"/>
                    </span>
                    </div>) : ''
                }
            </div>
        )
    }
}