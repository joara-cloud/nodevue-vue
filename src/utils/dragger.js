import dragula from 'dragula'
import 'dragula/dist/dragula.css'

const dragger = { // dragger라는 모듈 생성
	init(container) { // 초기화
		return dragula([...container]) // dragular 함수를 호출할 때 container를 받아서 객체를 생성
	},
	siblings({el, wrapper, candidates, type}) { // 인자로 주워진 target(인자로 넘어온 값)를 기준으로해서 prev, next를 반환함, candidates: 배열을 돌수있는 후보군들, type: card or list
		const curId = el.dataset[type + 'Id'] * 1
		// const curId = el.getAttribute('data-'+type+'-id') * 1
		// targetCard를 중심으로 앞 뒤에 어떤 카드들이 있는지 확인
		let prev = null
		let next = null


		// const targetCard = { // 어디로 이동해야할지 그 정보를 담고 있는 객체
		// 	id: el.dataset.cardId * 1, // *1 : 문자열을 숫자로 바꿔줌 (card id를 받으려면 CardItem.vue에서 data속성을 설정)
		// 	pos: 65535
		// }

		// Array.from(wrapper.querySelectorAll('.card-item')) // wrapper는 움직이는 아이템을 감싸고 있는 .card-list이고, querySelectorAll은 유사배열이니깐 Array.from으로 뽑고 forEach 사용!!
		candidates.forEach((el, idx, arr) => {
				// const cardId = el.dataset.cardId * 1
				const id = el.dataset[type + 'Id'] * 1
				
				if (id == curId) { // 배열을 순회하고있는 cardId가 이동하고자 하는 카드(CurId)와 동일하다면
					prev = idx > 0 ? { // 이동하고자 하는 카드가 첫번째 카드가 아님
						id: arr[idx - 1].dataset[type + 'Id'] * 1,
						pos: arr[idx - 1].dataset[type + 'Pos'] * 1,
					} : null // idx가 0이거나 0보다 작으면 맨앞에 있는거기때문에 이전카드는 없는것으로 판단 (null)

					next = idx < arr.length-1 ? { // 마지막이 아니라면? 다음 카드가 있는거겠지
						id: arr[idx + 1].dataset[type + 'Id'] * 1,
						pos: arr[idx + 1].dataset[type + 'Pos'] * 1,
					} : null // idx가 마지막 배열보다 크면 다음 카드는 없는것으로 판단
				}
				
			})

		return {prev, next}

	}
}

export default dragger