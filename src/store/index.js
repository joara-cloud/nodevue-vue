import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api' // 여러개를 export하니깐 전부 api라는 닉네임으로 받겠다고 해야함 (?)

Vue.use(Vuex);

const store = new Vuex.Store({ //Vuex라이브러리의 Store라는 클래스 함수를 실행, 옵션 객체를 넘겨줌
	state: {
		isAddBoard: false,
		boards: [],
		token: null
	},
	getters: { // component의 computed와 비슷
		isAuth (state) {
			return !!state.token
		}
	},
	mutations: {
		SET_IS_ADD_BOARD (state, toggle) {
			state.isAddBoard = toggle
		},
		SET_BOARDS (state, boards) {
			state.boards = boards
		},
		LOGIN (state, token) {
			if (!token) return
			state.token = token
			localStorage.setItem('token',token)
			api.setAuthInHeader(token)
		},
		LOGOUT (state) {
			state.token = null
			delete localStorage.token
			api.setAuthInHeader(null)
		}
	},
	actions: { // API호출과 같은 비동기 로직을 담당
		ADD_BOARD(_, {title}) { // context객체를 처음 받게되는데 사용하지 않을꺼니깐 언너바(_)로 넣음
			return api.board.create(title) // Promise를 리턴하고있음
		},
		FETCH_BOARDS ({commit}) {
			return api.board.fetch().then(data => {
				commit('SET_BOARDS', data.list)
			})
		},
		LOGIN ({commit}, {email, password}) {
			return api.auth.login(email, password)
				.then( ({accessToken}) => {
					commit('LOGIN', accessToken)
				})
		}
	}
});

const {token} = localStorage
store.commit('LOGIN', token)

export default store;