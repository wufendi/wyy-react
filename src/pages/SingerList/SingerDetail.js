import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {getQueryString}  from 'utils/commonFn';
import {getArtistList} from 'api/allApisList';
import './singerDetail.scss';

export default class SingerDetail extends Component {
    constructor(props){
        super(props);
        this.type = getQueryString('type');
        this.state = {
            artists: [],
            more: true,
            page: 0
        };
        this.getArtistList = (page) => {
            getArtistList(this.type,page).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    const data = this.state.artists.concat(resultData.artists);
                    this.setState(...this.state,{
                        page: page,
                        artists: data,
                        more: resultData.more
                    })
                } else {

                }
            })
        };
        this.loadMore = () => {
            const page = this.state.page + 30;
            this.getArtistList(page);
        }
    }
    componentDidMount() {
        if(this.type) {
            this.getArtistList(this.state.page);
        }
    }
    render() {
        const {artists, more} = this.state;
        return (
            <div className="page singer-detail">
                {
                    artists.length ? (<ul>
                        {artists.map((item,index) => {
                            return (
                                <li key={index}>
                                    <div className="img-div">
                                        <img src={item.img1v1Url}/>
                                    </div>
                                    <p><span>{item.name}</span> <i className="iconfont icon-user"/></p>
                                    <Link to={`/artist?id=${item.id}`} className="hidden-a"/>
                                </li>
                            )
                        })}
                        {
                            more? (
                                <li className="more" onClick={this.loadMore}>
                                    加载更多 <i className="iconfont icon-arrow-r"/>
                                </li>
                            ) : ''
                        }
                    </ul>):'暂无数据'
                }
            </div>
        )
    }
}