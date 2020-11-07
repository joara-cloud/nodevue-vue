import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({ //Vuex라이브러리의 Store라는 클래스 함수를 실행, 옵션 객체를 넘겨줌
	state: {
		isAddBoard: false
	}
});

export default store;