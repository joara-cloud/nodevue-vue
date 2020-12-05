import { setAuthInHeader } from '../api'

const mutations = {
	LOGIN (state, token) {
		if (!token) return
		state.token = token
		localStorage.setItem('token',token)
		setAuthInHeader(token)
	},
	LOGOUT (state) {
		state.token = null 
		delete localStorage.token
		setAuthInHeader(null)
	},
	SET_IS_ADD_BOARD (state, toggle) {
		state.isAddBoard = toggle
	},
	SET_BOARDS (state, boards) {
		state.boards = boards
	},
	SET_BOARD (state, board) {
		state.board = board
	},
	SET_CARD (state, card) {
		state.card = card
	},
	SET_THEME (state, color) { // 네비와 바디의 색상을 정의
		state.bodyColor = color || '#fff' // 들어오는 color값을 받고 그게 없으면 기본 색생은 흰색
		state.navbarColor = color ? 'rgba(0,0,0,.15)' : '#026aa7' // 들어오는 color값이 있으면 투명도가 있는 색 없으면 기본 색상은 #026aa7
	}
}

export default mutations