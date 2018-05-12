import React from 'react';
import { Route, Switch} from 'react-router-dom';

import Bundle from './Bundle';

import Home from 'bundle-loader?lazy&name=home!pages/Home/Home';
import Page1 from  'bundle-loader?lazy&name=page1!pages/Page1/Page1';
import Counter from 'bundle-loader?lazy&name=counter!pages/Counter/Counter';
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/UserInfo';
import Search from 'bundle-loader?lazy&name=userInfo!pages/Search/Search';
import Song from 'bundle-loader?lazy&name=song!pages/Song/Song';
import Album from 'bundle-loader?lazy&name=album!pages/Album/Album';
import Artist from 'bundle-loader?lazy&name=artist!pages/Artist/Artist';
import Mv from 'bundle-loader?lazy&name=mv!pages/Mv/Mv';
import User from 'bundle-loader?lazy&name=user!pages/User/User';
import Playlist from "bundle-loader?lazy&name=playlist!pages/Playlist/Playlist";
import RankingList from "bundle-loader?lazy&name=rankingList!pages/RankingList/RankingList";
import RankingListDetail from "bundle-loader?lazy&name=rankingListDetail!pages/RankingList/RankingListDetail";
import SingerRankingList from "bundle-loader?lazy&name=singerRankingListDetail!pages/RankingList/SingerRankingList";
import SingerList from "bundle-loader?lazy&name=singerList!pages/SingerList/SingerList"
import SingerDetail from "bundle-loader?lazy&name=singerDetail!pages/SingerList/SingerDetail";
import Recommend from "bundle-loader?lazy&name=recommend!pages/Recommend/Recommend";


const Loading = function () {
    return <div>Loading...</div>
};

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : <Loading/>
        }
    </Bundle>
);

const getRouter = () => (

            <Switch>
                <Route exact path="/" component={createComponent(Home)}/>
                <Route exact path="/page1" component={createComponent(Page1)}/>
                <Route exact path="/counter" component={createComponent(Counter)}/>
                <Route exact path="/userinfo" component={createComponent(UserInfo)}/>
                <Route exact path="/search" component={createComponent(Search)}/>
                <Route exact path="/song" component={createComponent(Song)}/>
                <Route exact path="/album" component={createComponent(Album)}/>
                <Route exact path="/artist" component={createComponent(Artist)}/>
                <Route exact path="/user" component={createComponent(User)}/>
                <Route exact path="/mv" component={createComponent(Mv)}/>
                <Route exact path="/playlist" component={createComponent(Playlist)}/>
                <Route exact path="/rankingList" component={createComponent(RankingList)}/>
                <Route exact path="/rankingListDetail" component={createComponent(RankingListDetail)}/>
                <Route exact path="/singerRankingList" component={createComponent(SingerRankingList)}/>
                <Route exact path="/singerList" component={createComponent(SingerList)}/>
                <Route exact path="/singerDetail" component={createComponent(SingerDetail)}/>
                <Route exact path="/recommend" component={createComponent(Recommend)}/>
            </Switch>
);

export default getRouter;
