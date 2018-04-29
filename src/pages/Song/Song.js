// 具体歌曲页面
import React, {Component} from 'react';
import {musicUrl} from 'api/allApisList';

export default class Song extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.query.id;
        this.state = {
            musicUrl: 'http://m10.music.126.net/20180429154449/51d0e1869a06bad918c1842f89312934/ymusic/2ba4/2130/8a71/574a2be2df717b2b1b0a57273fd3f873.mp3',
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
            })
        }
    }
    componentDidMount() {
        this.getMusicUrl();
    }
    render() {
        return (
            <div> Hello, Song

                <audio controls="controls" autoPlay="autoplay" src={this.state.musicUrl}/>
            </div>
        )
    }
}