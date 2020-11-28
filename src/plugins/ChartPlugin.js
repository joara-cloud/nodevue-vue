import Chart from 'chart.js';

export default {
	install(Vue) {
		Vue.prototype.$_Chart = Chart; // 객체의 속성을 확장하는게 prototype
		console.log('chart plugin loaded');
	}
}