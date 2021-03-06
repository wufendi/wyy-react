// 具体歌曲页面
import React, {Component} from 'react';
import Header from 'components/Header/Header';
import {musicUrl,songDetail} from 'api/allApisList';
import {getQueryString}  from 'utils/commonFn';
import './style.scss';
import defaultImg from './imgs/zly.jpg';
import disc from './imgs/disc.png';
import needle from './imgs/needle.png';
const defaultMp3 = require("file-loader!./mp3/xsdy.mp3");
export default class Song extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.query?this.props.location.query.id : getQueryString('id');
        this.state = {
            backgroundImg: defaultImg,
            musicUrl: defaultMp3/*'http://m10.music.126.net/20180429154449/51d0e1869a06bad918c1842f89312934/ymusic/2ba4/2130/8a71/574a2be2df717b2b1b0a57273fd3f873.mp3'*/,
        };
        this.getMusicUrl = () => {
            musicUrl(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        musicUrl: resultData.data[0].url
                    });
                } else {

                }
            });
        }
        this.getSongDetail = () => {
            songDetail(this.id).then(response => {
                const resultData = response.data;
                if (resultData.code === 200) {
                    this.setState(...this.state,{
                        backgroundImg: resultData.songs[0].al.picUrl
                    });
                } else {

                }
            });
        }
    }
    componentDidMount() {
        if (this.id) {
            this.getMusicUrl();
            this.getSongDetail()
        }
    }
    render() {
        const backgroundImg = this.state.backgroundImg;

        return (
            <div className='page song'>
                <Header title="歌曲详情面"/>
                <div className="background-img" style={{backgroundImage:`url(${backgroundImg})`}}>
                  <div className="content">
                      <div className="img-content">
                          <img src={needle} className="needle-img" alt="needle"/>
                          <img src={backgroundImg} className="song-img" alt=""/>
                          <img src={disc} className="disc-img" alt="disc"/>
                      </div>

                  </div>
                    <audio controls="controls" autoPlay="autoplay" src={this.state.musicUrl}/>
                </div>
            </div>

        )
    }
}
