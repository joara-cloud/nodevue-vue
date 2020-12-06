import axios from 'axios';
import {router} from '../routes';
import state from '../store/state';

const DOMAIN = 'http://localhost:3000';
const UNAUTHORIZED = 401;
const NOTFOUND = 404;
const onUnauthrorized = () => { // 401코드가 오면 처리해주는 함수
  router.push('/login'); // 로그인 페이지로 이동
}
const onNotFound = () => {
  router.push('/')
}

const request = (method, url, data) => { // request : backend API 요청
  return axios({ // 이렇게 객체형식으로 axios를 전달할수도있음, axios를 호출할 때 header값에 token정보를 넣어야한다..?
    method,
    url: DOMAIN + url,
    data
  })
  .then(result => result.data) // result.data는 body 데이터인데 이것을 넘겨줌
  .catch(result => {
    const {status} = result.response; // {status}는 result.response에서 status를 가지고 온 거
    if(status === UNAUTHORIZED) return onUnauthrorized();
    else if(status === NOTFOUND) onNotFound();
    throw Error(result);
  })
}

export const setAuthInHeader = token => {
  axios.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null; // 모든 request를 날리기전에 header값을 토큰정보로 설정
}

// const {token} = localStorage // 로그인 관련된 일은 store에 입력되어있음
// if(token) setAuthInHeader(token)

export const board = {
  fetch(id) {
    return id ? request('get', `/boards/${id}`) : request('get', '/boards') // 보드 하나를 조회할때는 localhost:3000/boards/1 이 경로로 보게 되어있으니 board/하고 id
  },
  create(title) {
    return request('post', '/boards', {title})
  },
  destroy(id) {
    return request('delete', `/boards/${id}`)
  },
  update(id, payload) {
    return request('put', `/boards/${id}`, payload)
  }
}

export const auth = {
  login(email, password) {
    return request('post', '/login', {email, password})
  }
}

export const card = {
  create(title, listId, pos) {
    return request('post', '/cards', {title, listId, pos})
  },
  fetch(id) {
    return request('get', `/cards/${id}`)
  },
  update(id, payload) { //payload는 객체
    return request('put', `/cards/${id}`, payload)
  },
  destroy(id) {
    return request('delete', `/cards/${id}`)
  }
}



// API List
// [Helath]
// curl localhost:3000/health
// [Login]
// curl -X POST localhost:3000/login -d 'email=test@test.com&password=123123'
// [Get board list]
// curl localhost:3000/boards -H 'Authorization: Bearer token'
// [Get board]
// curl localhost:3000/boards/1 -H 'Authorization: Bearer token'
// [Add board]
// curl -X POST localhost:3000/boards -H 'Authorization: Bearer token' -d "title=string"
// [Edit board]
// curl -X PUT localhost:3000/boards/1 -H 'Authorization: Bearer token' -d "title=string&bgColor=string"
// [Delete board]
// curl -X DELETE localhost:3000/boards/1 -H 'Authorization: Bearer token'"
// [Add list]
// curl -X POST localhost:3000/lists -H 'Authorization: Bearer token' -d "title=string&boardId=number&pos=number" // 지금은 number를 기본값으로 65,000이 서버에서 설정되어있음
// [Edit list]
// curl -X PUT localhost:3000/lists/1 -H 'Authorization: Bearer token' -d "title=string&pos=number"
// [Delete list]
// curl -X DELETE localhost:3000/lists/1 -H 'Authorization: Bearer token'
// [Add card]
// curl -X POST localhost:3000/cards -H 'Authorization: Bearer token' -d "title=string&listId=number&pos=number"
// [Get card]
// curl localhost:3000/cards/1 -H 'Authorization: Bearer token'
// [Edit card]
// curl -X PUT localhost:3000/cards/1 -H 'Authorization: Bearer token' -d "title=string&description=string&listId=number&pos=number"
// [Delete card]
// curl -X DELETE localhost:3000/cards/1 -H 'Authorization: Bearer token'