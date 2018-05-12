import React, {Component} from 'react';
import {Link} from 'react-router-dom';
export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleBack = () => {
            window.history.back();
        }
    }
    render() {
        const title = this.props.title;
        return (
            <div className="back-header">
                <i className="iconfont icon-arrow-l" onClick={this.handleBack}/>
                {title}
                <Link to="/" className="home">
                    <i className="iconfont icon-menu"/>
                </Link>
            </div>
        )
    }
}