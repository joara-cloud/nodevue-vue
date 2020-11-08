import Vue from 'vue';
import Vuex from 'vuex';
import * as api from '../api' // 여러개를 export하니깐 전부 api라는 닉네임으로 받겠다고 해야함 (?)

Vue.use(Vuex);

const store = new Vuex.Store({ //Vuex라이브러리의 Store라는 클래스 함수를 실행, 옵션 객체를 넘겨줌
	state: {
		isAddBoard: false,
		boards: []
	},
	mutations: {
		SET_IS_ADD_BOARD (state, toggle) {
			state.isAddBoard = toggle
		},
		SET_BOARDS (state, boards) {
			state.boards = boards
		}
	},
	actions: {
		ADD_BOARD(_, {title}) { // context객체를 처음 받게되는데 사용하지 않을꺼니깐 언너바(_)로 넣음
			return api.board.create(title) // Promise를 리턴하고있음
		},
		FETCH_BOARDS ({commit}) {
			return api.board.fetch().then(data => {
				commit('SET_BOARDS', data.list)
			})
		}
	}
});

export default store;