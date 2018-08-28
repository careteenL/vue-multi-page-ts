import Vue from 'vue'
import Router from 'vue-router'

import ActivityRules from '@demo/views/activity-rules/activity-rules.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/activity-rules',
			name: 'ActivityRules',
			component: ActivityRules
		}
	]
})
