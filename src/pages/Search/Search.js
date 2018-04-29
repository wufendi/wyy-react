// 搜索页面
import React, {Component} from 'react';
import {topArtists, search, searchSuggest} from 'api/allApisList';
import './style.scss';

export default class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasClickDetail: false,
            searchKeyword:'', // 搜索关键词
            hotSearch:[], // 热门搜索
            searchData: [], // 搜索结果
            searchSuggestData: {}, // 搜索建议结果
            historyData: [] // 历史搜索记录 最多10条
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
        this.getSearchSuggest = (keyword) => { // 获取搜索结果
            let historyData = this.state.historyData
            if (!this.state.historyData.includes(keyword)) {
                historyData.unshift(keyword);
                if (this.state.historyData.length < 10) {
                    this.setState(...this.state,{
                        historyData: historyData
                    });
                } else {
                    historyData.pop();
                    this.setState(...this.state,{
                        historyData: historyData
                    });
                }
            } else {
                historyData.splice(historyData.indexOf(keyword),1);
                historyData.unshift(keyword);
                this.setState(...this.state,{
                    historyData: historyData
                });
            }
            searchSuggest(keyword).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    console.log(resultData)
                    this.setState(...this.state,{
                        searchSuggestData: resultData.result
                    });
                } else {

                }
            });
            this.setState(...this.state, {
                hasClickDetail: true
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
        this.doDetail = (type,id) => {
            this.props.history.push({
                pathname: `/${type}`,
                query: {id: id},
            });
        }
    }
    componentDidMount() {
        this.getHotSearch();
    }
    render() {
        const searchKeyword = this.state.searchKeyword;
        const hotSearchData = this.state.hotSearch;
        const searchSuggestData = this.state.searchSuggestData;
        const searchData = this.state.searchData;
        const historyData = this.state.historyData;
        const hasClickDetail = this.state.hasClickDetail;
        const showSection = () => {
            if (hasClickDetail) { // 搜索结果
                return (
                    <div className="content">
                        <section className="match-section">
                            <ul className="list">
                                {
                                    searchSuggestData.albums? searchSuggestData.albums.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i} onClick={() => this.doDetail('album', item.id)}>
                                                <img src={item.artist.img1v1Url} alt=""/>
                                                <div>专辑：{item.name}<p className="desc">{item.artist.name}</p></div>
                                              <i className="iconfont icon-arrow-r"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {
                                    searchSuggestData.artists? searchSuggestData.artists.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i} onClick={() => this.doDetail('artist',item.id)}>
                                                <img src={item.img1v1Url} alt=""/>
                                                <span>歌手：{item.name}  <i className="iconfont icon-arrow-r"/></span>
                                            </li>
                                        )
                                    }): ''
                                }
                                {
                                    searchSuggestData.mvs? searchSuggestData.mvs.map((item, i) => {
                                        return (
                                            <li className="item img-item" key={i} onClick={() => this.doDetail('mv',item.id)}>
                                                <img src={item.cover} alt=""/>
                                                <div>MV：{item.name}<p className="desc">{item.artistName}</p></div>
                                                <i className="iconfont icon-arrow-r"/>
                                            </li>
                                        )
                                    }): ''
                                }
                                {searchSuggestData.songs? searchSuggestData.songs.map((item, i) => {
                                    return (
                                        <li className="item" key={i} onClick={() => this.doDetail('song',item.id)}>
                                            <div>{item.name}
                                            <p className="song-des">
                                                {
                                                    item.artists? item.artists.map((subItem, j) => {
                                                        const blueTextName = item.name === subItem.name ? 'blue-text' : '';
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
                                        </li>
                                    )
                                }): ''}
                            </ul>
                        </section>
                    </div>
                )
            } else if (searchKeyword === "") { // 热门搜索和历史搜素记录
                return (
                    <div className="content">
                        <section className="hot-search">
                            <h3>
                                热门搜索
                            </h3>
                            <ul className="list">
                                {hotSearchData.map((item, i) => {
                                    return (
                                        <li className="hot-item" key={i} onClick={() => this.getSearchSuggest(item.name)}>{item.name}</li>
                                    )
                                })}
                            </ul>
                        </section>
                        <section className="search-history">
                            <ul className="list">
                                {historyData.map((item, i) => {
                                    return (<li className="item" key={i} onClick={() => this.getSearchSuggest(item)}>
                                        <i className="iconfont icon-record" />
                                        <span>{item}<i className="iconfont icon-cancel"/></span>
                                    </li>)
                                })}
                            </ul>
                        </section>
                    </div>
                )
            } else if (searchKeyword) { // 正在搜索
                return (
                    <div className="content">
                        <section className="search-result-list">
                            <h3 className="title" onClick={() => this.getSearchSuggest(searchKeyword)}>
                               搜索 {searchKeyword ? `"${searchKeyword}"` : ''}
                            </h3>
                            <ul className="list">
                                {searchData.map((item, i) => {
                                    return (
                                        <li className="item" key={i} onClick={() => this.getSearchSuggest(item.name)}>
                                            <i className="iconfont icon-search"/>
                                            <span>{item.name}</span>
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
            <div className="page">
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