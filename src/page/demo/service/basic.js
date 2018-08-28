/**
 *
 * @desc 经纪人分享&邀请
 */

import ajax from '@api/fetch'
import config from '@config'
import 'whatwg-fetch'

const model = {}

/**
 *
 * @desc API
 *       
 */
model.Login = (params, cb) => {
	ajax({
		url: `${config.careteenDomain}/login/`,
		type: 'POST',
		data: params,
		withCredentials: true,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		success(res) {
			cb && cb(res)
		}
	})
}

export default model
