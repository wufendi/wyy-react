import React, {Component} from 'react';
import {getArtistsSong} from 'api/allApisList';
import './style.scss';
export default class Artist extends Component {
    constructor(props){
        super(props)
        this.id = this.props.location.query?this.props.location.query.id : '';
        this.state = {
            img1v1Url: '',
            picUrl: '',
            singerName: '',
            description: '',
            introShowAll: false,
            hotSongs:[],
        }
        this.doIntroShowAll = () => {
            this.setState(...this.state,{
                introShowAll: !this.state.introShowAll
            })
        }
        this.getArtistsSong = () => {
            getArtistsSong(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    const artist = resultData.artist
                    this.setState(...this.state,{
                        picUrl: artist.picUrl,
                        singerName: artist.name,
                        description: artist.briefDesc,
                        hotSongs: resultData.hotSongs
                    })
                } else {

                }
            });
        }
        this.doDetail = (type,id) => {
            this.props.history.push({
                pathname: `/${type}`,
                query: {id: id},
            });
        };
    }
    componentDidMount() {
        if (this.id) {
            this.getArtistsSong();
        }
    }
    render() {
        const picUrl = this.state.picUrl;
        const singerName = this.state.singerName;
        const description = this.state.description;
        const hotSongs = this.state.hotSongs;
        return (
            <div className="page">
                <section className="top">
                    <img className="bg" src={picUrl}/>
                    <p className="singer-name">{singerName}</p>
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
                    热门50单曲
                </div>
                <ul className="songs-list">
                    {
                        hotSongs.length > 0? hotSongs.map((item,index) => {
                            return (
                                <li key={index} onClick={() => this.doDetail('song',item.id)}>
                                    <div className="li-num">{index+1}</div>
                                    <div className="li-wrap">
                                        <div className="fl">
                                            <div className="song-name">{item.name}</div>
                                            <div className="song-info">
                                                {item.ar[0].name} - {item.al[0]}
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
            </div>
        )
    }
}