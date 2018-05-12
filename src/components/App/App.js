import React, {Component} from 'react';
import getRouter from 'router/router';

export default class App extends Component {
    render() {
        return (
            <div className="pages">
                {getRouter()}
            </div>
        )
    }
}