import React, {Component} from 'react';
import './Page1.css';
import image from './imgs/zly.jpg';

export default class Page1 extends Component {
    render() {
        return (
            <div className="page-box">
                Page1, React change8888 22289 <br/>
                <img src={image} style={{width:'800px'}} alt=""/>
            </div>
        )
    }
}