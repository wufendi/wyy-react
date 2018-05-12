import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Nav from 'components/Nav/Nav';
import {getPersonalized, getPersonalizedNewSong, getPersonalizedDjProgram, getPersonalizedMv, getRecommend } from 'api/allApisList';
import "./style.scss";

export default class Recommend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistData: [], // 推荐歌单
            newSongData: [], // 推荐新音乐
            djProgramData: [], // 推荐主播电台
            mvListData: [], // 推荐MV
            programData: [] // 推荐节目
        };
        this.getPlaylistData = () => {
            getPersonalized().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        playlistData: resultData.result
                    })
                } else {

                }
            })
        };
        this.getNewSongData = () => {
            getPersonalizedNewSong().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        newSongData: resultData.result
                    })
                } else {

                }
            })
        };
        this.getDjProgramData = () => {
            getPersonalizedDjProgram().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        djProgramData: resultData.result
                    })
                } else {

                }
            })
        };
        this.getMvListData = () => {
            getPersonalizedMv().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        mvListData: resultData.result
                    })
                } else {

                }
            })
        };
        this.getProgramData = () => {
            getRecommend().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        programData: resultData.programs
                    })
                } else {

                }
            })
        };
    }
    componentDidMount() {
        this.getPlaylistData();
        this.getNewSongData();
        this.getDjProgramData();
        this.getMvListData();
        this.getProgramData();
    }
    render() {
        const {playlistData, newSongData, djProgramData, mvListData, programData} = this.state;
        return (
            <div className="page recommend">
                <Nav/>
                {
                    playlistData.length ? (
                        <div>
                            <h2 className="title">
                                推荐歌单 <i className="iconfont icon-arrow-r"/>
                            </h2>
                            <ul>
                                {
                                    playlistData.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="img-div">
                                                    <img src={item.picUrl}/>
                                                    <div className="num"><i className="iconfont icon-headerset"/>{item.playCount}</div>
                                                </div>
                                                <div className="des">
                                                    {item.name}
                                                </div>
                                                <Link to={`/playlist?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                {
                    newSongData.length ? (
                        <div>
                            <h2 className="title">
                                推荐新音乐 <i className="iconfont icon-arrow-r"/>
                            </h2>
                            <ul>
                                {
                                    newSongData.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="img-div">
                                                    <img src={item.song.album.picUrl}/>
                                                </div>
                                                <div className="des">
                                                   <p className="song-name">{item.song.album.name}</p>
                                                   <p className="singer-name">{item.song.album.artists.map((subItem,subIndex) => {
                                                       const dot = subIndex === item.song.album.artists.length - 1 ? '': '/';
                                                       return (
                                                           <span key={subIndex}>{subItem.name} {dot} </span>
                                                       )
                                                   })}</p>
                                                </div>
                                                <Link to={`/album?id=${item.song.album.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                {
                    djProgramData.length ? (
                        <div>
                            <h2 className="title">
                                推荐主播电台 <i className="iconfont icon-arrow-r"/>
                            </h2>
                            <ul>
                                {
                                    djProgramData.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="img-div">
                                                    <img src={item.picUrl}/>
                                                    <div className="nickname">{item.program.radio.name}</div>
                                                </div>
                                                <div className="des">
                                                    {item.program.radio.rcmdText? item.program.radio.rcmdText:item.program.name}
                                                </div>
                                                <Link to={`/playlist?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                {
                    mvListData.length ? (
                        <div>
                            <h2 className="title">
                                推荐MV <i className="iconfont icon-arrow-r"/>
                            </h2>
                            <ul className="mv-ul">
                                {
                                    mvListData.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="img-div">
                                                    <img src={item.picUrl}/>
                                                    <div className="num"><i className="iconfont icon-radio"/>{item.playCount}</div>
                                                </div>
                                                <div className="des">
                                                    {item.name}
                                                </div>
                                                <Link to={`/mv?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
                {
                    programData.length ? (
                        <div>
                            <h2 className="title">
                                推荐节目 <i className="iconfont icon-arrow-r"/>
                            </h2>
                            <ul>
                                {
                                    programData.map((item,index) => {
                                        return (
                                            <li key={index}>
                                                <div className="img-div">
                                                    <img src={item.radio.picUrl}/>
                                                    <div className="nickname">{item.radio.name}</div>
                                                </div>
                                                <div className="des">
                                                    {item.radio.rcmdText? item.radio.rcmdText:item.name}
                                                </div>
                                                <Link to={`/playlist?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}