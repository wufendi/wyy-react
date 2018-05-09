import React, {Component} from 'react';
import {getQueryString}  from 'utils/commonFn';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.id = this.props.location.query ? this.props.location.query.id : getQueryString('id') ? getQueryString('id') : 5436712;
    }
    render() {
        return (
            <div className="page"> Hello, User {this.id} </div>
        )
    }
}