import * as api from '../api' // 여러개를 export하니깐 전부 api라는 닉네임으로 받겠다고 해야함 (?)

const actions = { // API호출과 같은 비동기 로직을 담당
	LOGIN ({commit}, {email, password}) { 
		return api.auth.login(email, password)
			.then( ({accessToken}) => {
				commit('LOGIN', accessToken)
			})
	},
	ADD_BOARD(_, {title}) { // context객체를 처음 받게되는데 사용하지 않을꺼니깐 언너바(_)로 넣음
		return api.board.create(title).then(data => data.item) // Promise를 리턴하고있음
	},
	FETCH_BOARDS ({commit}) {
		return api.board.fetch().then(data => {
			commit('SET_BOARDS', data.list)
		})
	},
	FETCH_BOARD ({commit}, {id}) {
		return api.board.fetch(id).then(data => {
			commit('SET_BOARD', data.item)
		})
	},
	ADD_CARD ({dispatch, state}, {title, listId, pos}) { // context의 dispatch를 가져옴
		return api.card.create(title, listId, pos)
			.then(() => {
				dispatch('FETCH_BOARD', {id: state.board.id}) // 카드 추가 후 그 결과를 화면에 뿌리기, 두 번째 인자로 아이디 넘겨주기 (state Vuex상태로 선택된 board를 관리하고있음 그래서 state를 가져와야하는데 이것도 context객체에서 가져옴)
			})
	}
}

export default actions