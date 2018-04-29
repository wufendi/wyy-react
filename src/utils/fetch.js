import axios from 'axios'
import qs from 'qs';
// import store from '../redux/store';

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 10000                  // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.data = qs.stringify(config.data)
    return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        if (res.code === '401') {
            // store.dispatch({type: 'login/LOGINOUT'})
            // location.reload()
        } else {
            return response
        }
    },
    error => {
        console.log('err' + error)// for debug
        if (error.message === 'timeout of 10000ms exceeded') {
            error.message = '服务器超时了！'
        }
       // message.warning(error.message)
        return Promise.reject(error)
    }
)

export default service