import Service from '@demo/service/basic.js'

const state = {
	// 基本信息表单数据
	test: ''
}

const mutations = {
	// UPDATE_BASICINFO(state, payload) {
	// 	state[payload.name] = payload.value
	// }
}

const actions = {
	Test(context) {
		// Service.GEconCompany({}, res => {
		// 	if (+res.code === 200) {
		// 		context.commit('UPDATE_BASICINFO', { name: 'brokerId', value: res.data.uid })
		// 	} else {
		// 		console.error(res.msg)
		// 	}
		// })
	}
}


export default {
	namespaced: true,
	state,
	actions,
	mutations
}

