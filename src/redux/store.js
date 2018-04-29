import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'; // 中间件来处理函数形式的action，把他们转为标准的action给reducer
import combineReducers from './reducers.js';
import promiseMiddleware from './middleware/promiseMiddleware'

let store = createStore(combineReducers, applyMiddleware(promiseMiddleware));

export default store;