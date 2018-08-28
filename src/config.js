/**
 * 
 * @desc 全局域名等变量维护
 * 127.0.0.1|localhost  127.0.0.1|localhost  proxy
 */ 
let byProxy = false
let mainDomain

// 本地开发走proxy
if (/(\d+\.\d+\.\d+\.\d+)|(.*\.cn:\d{4}.*)/.test(location.host)) {
	byProxy = true
}
// 测试线上等环境
if (!byProxy) {
	const hostArr = location.hostname.split('.')
	mainDomain = `.${hostArr[hostArr.length - 2]}.${hostArr[hostArr.length - 1]}`
}
module.exports = {
	mainDomain: byProxy ? '127.0.0.1' : mainDomain,

	mockDomain: byProxy ? '/MOCK' : '',

	imgDomain: '//t1.careteen-img.cn',
	IMG_SH60: '/sh60x60sh',

	careteenDomain: byProxy ? '' : `//careteen${mainDomain}`,
}
