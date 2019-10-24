import axios from './ajax';
export default { //另外的一种调用方式
    // page接口 params接收参数，返回给接口
    page: params => axios.get('/IndexPage', { params }),
    // ticket接口
    ticket: params => axios.post('/IndexPage/submitTicket', params),
}