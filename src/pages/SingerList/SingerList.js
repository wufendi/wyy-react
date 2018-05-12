import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
const singType = [
    {
        name: '华语',
        type: {
            gentle: 1001,
            lady: 1002,
            band: 1003
        }
    },
    {
        name: '欧美',
        type: {
            gentle: 2001,
            lady: 2002,
            band: 2003
        }
    },
    {
        name: '日本',
        type: {
            gentle: 6001,
            lady: 6002,
            band: 6003
        }
    },
    {
        name: '韩国',
        type: {
            gentle: 7001,
            lady: 7002,
            band: 7003
        }
    },
    {
        name: '其他',
        type: {
            gentle: 4001,
            lady: 4002,
            band: 4003
        }
    }
]


export default class SingerList extends Component {
    render() {
        return (
            <div className="page singer-list">
                <h4>推荐</h4>
                <ul>
                    <li>推荐歌手
                        <i className="iconfont icon-arrow-r"/>
                        <Link to={`/singerDetail?type=5002`} className="hidden-a"/>
                    </li>
                    <li>入驻歌手
                        <i className="iconfont icon-arrow-r"/>
                        <Link to={`/singerDetail?type=5001`} className="hidden-a"/>
                    </li>
                </ul>
                {
                    singType.map((item,index)=>{
                        return (
                            <div key={index}>
                                <h4>{item.name}</h4>
                                <ul>
                                    <li>
                                        {`${item.name}男歌手`}
                                        <i className="iconfont icon-arrow-r"/>
                                        <Link to={`/singerDetail?type=${item.type.gentle}`} className="hidden-a"/>
                                    </li>
                                    <li>
                                        {`${item.name}女歌手`}
                                        <i className="iconfont icon-arrow-r"/>
                                        <Link to={`/singerDetail?type=${item.type.lady}`} className="hidden-a"/>
                                    </li>
                                    <li>
                                        {`${item.name}组合/乐队`}
                                        <i className="iconfont icon-arrow-r"/>
                                        <Link to={`/singerDetail?type=${item.type.band}`} className="hidden-a"/>
                                    </li>
                                </ul>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}