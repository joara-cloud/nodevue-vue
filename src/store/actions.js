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
			console.log(data.item);
			commit('SET_BOARD', data.item)
		})
	}
}

export default actions