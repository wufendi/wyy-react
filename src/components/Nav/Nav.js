import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './style.scss';

export default class Nav extends Component {
    render() {
        return (
            <header className="header">
                <div className="top">
                    <div className="logo">
                        <i className="iconfont icon-music"/>
                        <span>网易云音乐</span>
                    </div>
                    <div className="download">
                        下载APP
                    </div>
                </div>
                <ul className="nav">
                    {/*<li><Link to="/">首页</Link></li>*/}
                    {/*<li><Link to="/page1">Page1</Link></li>*/}
                    <li><NavLink to="/recommend">推荐</NavLink></li>
                    <li><NavLink to="/singerList">歌手</NavLink></li>
                    <li><NavLink to="/rankingList">排行榜</NavLink></li>
                    <li><NavLink to="/search">搜索</NavLink></li>
                </ul>
            </header>
        )
    }
}