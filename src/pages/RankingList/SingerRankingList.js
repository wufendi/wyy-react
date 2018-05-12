import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getTopListArtist} from 'api/allApisList';
import {monthDayFormat}  from 'utils/commonFn';
import './singerRankingList.scss';

export default class SingerRankingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            updateTime: ''
        }
        this.getTopListArtist = () => {
            getTopListArtist().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        artists: resultData.list.artists,
                        updateTime: resultData.list.updateTime
                    })
                } else {

                }
            })
        }
    }
    componentDidMount() {
        this.getTopListArtist();
    }
    render() {
        const {artists, updateTime} = this.state;
        function getCurrentRank(lastRank,currentRank) {
            let value = lastRank - currentRank;
            const className = value === 0 ? 'iconfont icon-flat': value < 0 ? 'iconfont icon-arrow-db down': 'iconfont icon-arrow-dt up';
            value = Math.abs(value);
            return {
                value,
                className
            };
        }
        return (
            <div className="page singer-ranking-list">
            {
                artists.length?(
                    <div>
                        <div className="title">
                            更新时间：{monthDayFormat(updateTime,true)}
                        </div>
                        <ul>
                            {artists.map((item,index) =>{
                                return(
                                    <li key={index}>
                                        <div className="num">
                                            <span>{index + 1}</span>
                                            <span className="rank"><i className={getCurrentRank(item.lastRank, index).className}/>{getCurrentRank(item.lastRank, index).value}</span>
                                        </div>
                                        <img src={item.img1v1Url}/>
                                        <div className="content">
                                            <div className="singer-name">{item.name}</div>
                                            <div className="hot"><i className="iconfont icon-hot"/><span>{item.score}</span></div>
                                            <Link to={`artist?id=${item.id}`} className="des"><span className="blue-text">#{item.name}#</span>{item.topicPerson}人正在讨论 <i className="iconfont icon-arrow-r"/></Link>
                                            <Link to={`artist?id=${item.id}`} className="hidden-a" />
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                ):'暂无数据'
            }
            </div>
        )
    }
}