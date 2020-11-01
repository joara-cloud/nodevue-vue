import axios from 'axios';
import {router} from '../routes';

const DOMAIN = 'http://localhost:3000';
const UNAUTHORIZED = 401;
const onUnauthrorized = () => { // 401코드가 오면 처리해주는 함수
  router.push('/login');
}

const request = (method, url, data) => { // request : backend API 요청
  return axios({ // 이렇게 객체형식으로 axios를 전달할수도있음
    method,
    url: DOMAIN + url,
    data
  })
  .then(result => result.data) // result.data는 body 데이터인데 이것을 넘겨줌
  .catch(result => {
    const {status} = result.response; // {status}는 result.response에서 status를 가지고 온 거
    if(status === UNAUTHORIZED) return onUnauthrorized();
    throw Error(result);
  })
}

export const board = {
  fetch() {
    return request('get', '/boards');
  }
}