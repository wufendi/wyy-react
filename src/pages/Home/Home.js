import React, {Component} from 'react';
import { test } from 'api/test';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0
        };
        this._handleIncClick = () => {
            this.setState({
                count: ++this.state.count
            });
        }
        this._handleDesClick = () => {
            this.setState({
                count: --this.state.count
            });
        }
        this._testApiClick = () => {
            test(24381616).then(response => {
                console.log(response)
            })
        }
    }
    render () {
        return (
            <div> Home, React 555666 hello world
            当前counter是 {this.state.count} <br/>
                <button onClick={this._handleIncClick} style={{marginLeft: '10px'}}>增加</button>
                <button onClick={this._handleDesClick}>减少</button>
                <button onClick={this._testApiClick}>Test获取数据</button>
            </div>
        )
    }
}