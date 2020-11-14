const getters = { // component의 computed와 비슷
	isAuth (state) {
		return !!state.token
	}
}

export default getters