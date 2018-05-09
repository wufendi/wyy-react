// 搜索页面
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {topArtists, search, searchSuggest} from 'api/allApisList';
import {setHistoryData} from 'actions/search';
import './style.scss';

@connect(
    (state, props) => ({ historyData: state.search.historyData}),
    dispatch => ({
        setHistoryData: (data) => dispatch(setHistoryData(data)),
    }),
)

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasClickDetail: false,
            currentPage: 1,
            searchKeyword:'', // 搜索关键词
            hotSearch:[], // 热门搜索
            searchData: [], // 搜索结果
            searchSuggestData: {} // 搜索建议结果
        };
        this.getHotSearch = () => { // 获取热门搜索
            topArtists().then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        hotSearch: resultData.artists
                    });
                } else {

                }
            })
        };
        this.getSearch = (keyword) => { // 搜索中
            search(keyword).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        searchData: resultData.result.songs || []
                    });
                } else {

                }
            })
        };
        this.getSearchSuggest = (keyword, page) => { // 获取搜索结果
            let historyData = this.props.historyData
            if (!this.props.historyData.includes(keyword)) {
                historyData.unshift(keyword);
                if (this.props.historyData.length < 10) {
                    this.props.setHistoryData(historyData);
                } else {
                    historyData.pop();
                    this.props.setHistoryData(historyData);
                }
            } else {
                historyData.splice(historyData.indexOf(keyword),1);
                historyData.unshift(keyword);
                this.props.setHistoryData(historyData);
            }
            searchSuggest(keyword, page).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    if (page === 1) {
                        this.setState(...this.state,{
                            searchSuggestData: resultData.result
                        });
                    } else {

                    }
                } else {

                }
            });
            this.setState(...this.state, {
                hasClickDetail: true,
                searchKeyword: keyword,
                currentPage: page
            });
        };
        this.doSearch = (event) => { // 关键词改变时
            const keyword = event.target.value
            if (keyword !== this.state.searchKeyword) {
                this.setState(...this.state,{
                    searchKeyword: keyword.trim()
                });
              this.getSearch(keyword);
            }
            this.setState(...this.state, {
                hasClickDetail: false
            });
        };
        this.doCancel = () => { // 取消搜索时
            if (this.state.searchKeyword!=='') {
                this.setState(...this.state,{
                    searchKeyword: ''
                })
            }
            this.setState(...this.state, {
                hasClickDetail: false
            })
        };
        this.doScroll = () => {
            if (this.state.hasClickDetail) {
                const page = this.state.currentPage + 1;
                this.getSearchSuggest(this.state.searchKeyword,page);
            }

        }
    }
    componentDidMount() {
    //  this.refs.test.addEventListener('scroll', this.doScroll, false);
        this.getHotSearch();
    }
    render() {
        const searchKeyword = this.state.searchKeyword;
        const hotSearchData = this.state.hotSearch;
        const searchSuggestData = this.state.searchSuggestData;
        const searchData = this.state.searchData;
        const historyData = this.props.historyData;
        const hasClickDetail = this.state.hasClickDetail;
        const showSection = () => {
            if (hasClickDetail) { // 搜索结果
                return (
                    <div className="content" >
                        <section className="match-section" ref="test">
                            <ul className="list">
                                {
                                    searchSuggestData.albums? searchSuggestData.albums.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i}>
                                                <img src={item.artist.img1v1Url} alt=""/>
                                                <div>专辑：{item.name}<p className="desc">{item.artist.name}</p></div>
                                              <i className="iconfont icon-arrow-r"/>
                                              <a href={`/album?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {
                                    searchSuggestData.artists? searchSuggestData.artists.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i}>
                                                <img src={item.img1v1Url} alt=""/>
                                                <div>歌手：{item.name}  <i className="iconfont icon-arrow-r"/></div>
                                                <a href={`/artist?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {
                                    searchSuggestData.mvs? searchSuggestData.mvs.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i}>
                                                <img src={item.cover} alt=""/>
                                                <div>MV：{item.name}<p className="desc">{item.artistName}</p></div>
                                                <i className="iconfont icon-arrow-r"/>
                                                <a href={`/mv?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {
                                    searchSuggestData.playlists? searchSuggestData.playlists.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i}>
                                                <img src={item.coverImgUrl}/>
                                                <div>歌单：{item.name}<p className="desc">
                                                    {item.trackCount} 首 by ，播放{item.playCount}</p>
                                                </div>
                                                <i className="iconfont icon-arrow-r"/>
                                                <a href={`/playlist?id=${item.id}`} className="hidden-a"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {searchSuggestData.songs? searchSuggestData.songs.map((item, i) => {
                                    return (
                                        <li className="item" key={i}>
                                            <div>{item.name}
                                            <p className="song-des">
                                                {
                                                    item.artists? item.artists.map((subItem, j) => {
                                                        const blueTextName = searchKeyword === subItem.name ? 'blue-text' : '';
                                                        let feeIcon = '';
                                                        if (j === 0 && item.fee !== 0) {
                                                            feeIcon = <i className="iconfont icon-vip"/>;
                                                        }
                                                        if (j === item.artists.length - 1) {
                                                            return(<b key={j} className={blueTextName}>{feeIcon}{subItem.name}</b>)
                                                        } else {
                                                            return(<b key={j} className={blueTextName}>{feeIcon}{subItem.name}/</b>)
                                                        }

                                                    }) : ''
                                                }
                                                {
                                                    item.alias? item.alias.map((subItem, j) => {
                                                        return(<b key={j}>-{subItem}</b>)
                                                    }) : ''
                                                }
                                            </p>
                                            </div>
                                            <i className="iconfont icon-start"/>
                                            <a href={`/song?id=${item.id}`} className="hidden-a"/>
                                        </li>
                                    )
                                }): ''}
                            </ul>
                        </section>
                    </div>
                )
            } else if (searchKeyword === "") { // 热门搜索和历史搜素记录
                return (
                    <div className="content" >
                        <section className="hot-search" ref="test">
                            <h3>
                                热门搜索
                            </h3>
                            <ul className="list">
                                {hotSearchData.map((item, i) => {
                                    return (
                                        <li className="hot-item" key={i} onClick={() => this.getSearchSuggest(item.name,1)}>{item.name}</li>
                                    )
                                })}
                            </ul>
                            <ul className="history-list">
                                {historyData.map((item, i) => {
                                    return (<li className="item" key={i} onClick={() => this.getSearchSuggest(item,1)}>
                                        <i className="iconfont icon-record" />
                                        <div className="history-div">{item}<i className="iconfont icon-cancel"/></div>
                                    </li>)
                                })}
                            </ul>
                        </section>
                    </div>
                )
            } else if (searchKeyword) { // 正在搜索
                return (
                    <div className="content" >
                        <section className="search-result-list" ref="test">
                            <h3 className="title" onClick={() => this.getSearchSuggest(searchKeyword,1)}>
                               搜索 {searchKeyword ? `"${searchKeyword}"` : ''}
                            </h3>
                            <ul className="list">
                                {searchData.map((item, i) => {
                                    return (
                                        <li className="item" key={i} onClick={() => this.getSearchSuggest(item.name,1)}>
                                            <i className="iconfont icon-search"/>
                                            <div className="search-div">{item.name}</div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </section>
                    </div>
                )
            }
        }
        return (
            <div className="page search">
                <div className="header">
                    <i className="iconfont icon-search"/>
                    <input type="text" placeholder="搜索歌曲、歌手、专辑" onChange={this.doSearch} value={searchKeyword} />
                    {searchKeyword ? <i className="iconfont icon-cancel" onClick={this.doCancel}/> : ''}
                </div>
                {showSection()}
            </div>
        )
    }
}