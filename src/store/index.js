import Vue from 'vue';
import Vuex from 'vuex';
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({ //Vuex라이브러리의 Store라는 클래스 함수를 실행, 옵션 객체를 넘겨줌
	state,
	getters,
	mutations,
	actions
});

const {token} = localStorage // 애플리케이션을 구동할 때 로컬스토리지에서 토큰정보를 읽어와 로그인 처리하는 로직
store.commit('LOGIN', token)

export default store;