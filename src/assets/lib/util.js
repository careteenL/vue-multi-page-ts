/**
 *
 * @desc JS 工具库
 * @author careteen.wang <15074806497@163.com>
 * @copyright 2017 Sohu Focus
 * @createDate 2017.12.07
 * @recentUpdate 2017.12.09
 * @github https://github.com/careteenL/webFEDeveloper/blob/master/Util/util.js
 * @other JSDoc Guide : http://yuri4ever.github.io/jsdoc/
 */

var Tools = {
	/**
	 *
	 * @desc 设置cookie
	 * @param {String} cname
	 * @param {String} cvalue
	 * @param {Number} exdays
	 * @param {String} domain [defalut: '']
	 * @param {String} path [defalut: '/']
	 */
	setCookie(cname, cvalue, exdays, domain, path) {
		const d = new Date();
		d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
		const expires = `expires=${d.toUTCString()}`;
		var path = path ? `;path=${path}` : '/';
		var domain = domain ? `;domain=${domain}` : '';
		document.cookie = `${cname}=${cvalue}; ${expires}${domain}${path}`;
	},

	/**
	 *
	 * @desc 根据name读取cookie
	 * @param  {String} name
	 * @return {String}
	 */
	getCookie(name) {
		const arr = document.cookie.replace(/\s/g, '').split(';');
		for (let i = 0; i < arr.length; i++) {
			const tempArr = arr[i].split('=');
			if (tempArr[0] == name) {
				return decodeURIComponent(tempArr[1]);
			}
		}
		return '';
	},

	/**
	 *
	 * @desc 根据name删除cookie
	 * @param  {String} name
	 */
	removeCookie(name) {
		// 设置已过期，系统会立刻删除cookie
		this.setCookie(name, '1', -1);
	},

	/**
	 *
	 * @desc 判断是否是无痕模式
	 * @return {Boolean}
	 */
	isPrivateMode() {
		try {
			window.localStorage.setItem('isPrivateMode', 1);
			window.localStorage.removeItem('isPrivateMode');
			return false;
		} catch (e) {
			return true;
		}
	},

	/**
	 *
	 * @desc 设置 localStorage
	 * @param {String} key
	 * @param {String} value
	 */
	setStorage(key, value) {
		if (!this.isPrivateMode() && window.localStorage) {
			window.localStorage.setItem(key, value);
		} else {
			this.setCookie(key, value, 30);
		}
	},

	/**
	 *
	 * @desc 取到某个 localStorage
	 * @param {String} key
	 * @return {String}
	 */
	getStorage(key) {
		if (!this.isPrivateMode() && window.localStorage) {
			return window.localStorage.getItem(key);
		}
		return this.getCookie(key);
	},

	/**
	 *
	 * @desc 清除某个 localStorage
	 * @param {String} key
	 */
	removeStorage(key) {
		if (
			!this.isPrivateMode() &&
			window.localStorage &&
			this.getStorage(key) != null
		) {
			window.localStorage.removeItem(key);
		} else if (this.getCookie(key) != null) {
			this.clearCookie(key);
		}
	},

	/**
	 *
	 * @desc 插入js
	 * @param {String} url
	 * @param {Function} callback
	 */
	loadJs(url, callback) {
		let doc = window.document,
			head =
				doc.head ||
				doc.getElementsByTagName('head')[0] ||
				doc.documentElement,
			script = doc.createElement('script');
		script.type = 'text/javascript';
		script.charset = 'utf-8';
		script.onload = function() {
			callback && callback.call(this);
		};
		script.src = url;
		head.insertBefore(script, head.firstChild);
	},

	/**
	 * @desc 深拷贝，支持常见类型
	 * @param {Any} values
	 */
	deepClone(values) {
		let copy;
		// 处理 三种简单类型、 null 、 undefined
		if (values == null || typeof values !== 'object') return values;
		// 处理 Date
		if (values instanceof Date) {
			copy = new Date();
			copy.setTime(values.getTime());
			return copy;
		}
		// 处理 Array
		if (values instanceof Array) {
			copy = [];
			for (let i = 0, len = values.length; i < len; i++) {
				copy[i] = this.deepClone(values[i]);
			}
			return copy;
		}
		// 处理 Object
		if (values instanceof Object) {
			copy = {};
			for (const attr in values) {
				if (values.hasOwnProperty(attr)) { copy[attr] = this.deepClone(values[attr]); }
			}
			return copy;
		}
		throw new Error("Unable to copy values! Its type isn't supported.");
	},

	/**
	 *
	 * @desc   判断`obj`是否为空
	 * @param  {Object} obj
	 * @return {Boolean}
	 */
	isEmptyObject(obj) {
		if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
			return false;
		}
		return !Object.keys(obj).length;
	},

	/**
	 *
	 * @desc 初始化移动端 local/dev/test/online 调试工具 eruda
	 * @example 在项目入口处加入
	 */
	initEruda() {
		if (
			!/eruda=true/.test(window.location) ||
			this.getStorage('eruda') !== 'true'
		) { return; }
		const url = '//cdn.bootcss.com/eruda/1.2.4/eruda.min.js';
		this.loadJs(url, () => {
			eruda.init();
		});
	},

	/**
	 *
	 * @desc 点击某个元素10次 触发 eruda, 再点击10次 取消 eruda 。
	 * @example 使用前 先在需要加调试功能的页面入口加上 initEruda
	 */
	ERUDA_COUNT: 0,
	showEruda() {
		this.ERUDA_COUNT++;
		if (this.ERUDA_COUNT >= 10) {
			const eruda = this.getStorage('eruda');
			if (!eruda || eruda === 'false') {
				this.setStorage('eruda', 'true');
				window.location.href = this.setParam('eruda', 'true');
				location.reload();
			} else {
				this.setStorage('eruda', 'false');
				window.location.href = this.removeParam('eruda');
				location.reload();
			}
		}
	},

	/**
	 *
	 * @desc 获取浏览器类型和版本
	 * @return {String}
	 */
	getExplore() {
		let sys = {},
			ua = navigator.userAgent.toLowerCase(),
			s;
		(s = ua.match(/rv:([\d.]+)\) like gecko/))
			? (sys.ie = s[1])
			: (s = ua.match(/msie ([\d\.]+)/))
				? (sys.ie = s[1])
				: (s = ua.match(/edge\/([\d\.]+)/))
					? (sys.edge = s[1])
					: (s = ua.match(/firefox\/([\d\.]+)/))
						? (sys.firefox = s[1])
						: (s = ua.match(/(?:opera|opr).([\d\.]+)/))
							? (sys.opera = s[1])
							: (s = ua.match(/chrome\/([\d\.]+)/))
								? (sys.chrome = s[1])
								: (s = ua.match(/version\/([\d\.]+).*safari/))
									? (sys.safari = s[1])
									: 0;
		// 根据关系进行判断
		if (sys.ie) return `IE: ${sys.ie}`;
		if (sys.edge) return `EDGE: ${sys.edge}`;
		if (sys.firefox) return `Firefox: ${sys.firefox}`;
		if (sys.chrome) return `Chrome: ${sys.chrome}`;
		if (sys.opera) return `Opera: ${sys.opera}`;
		if (sys.safari) return `Safari: ${sys.safari}`;
		return 'Unkonwn';
	},

	/**
	 *
	 * @desc 判断是否 是FocusApp环境下
	 *       wiki地址：http://wiki.ops.focus.cn/pages/viewpage.action?pageId=9509294
	 * @return {Boolean}
	 */
	isFocusApp() {
		const userAgent =
			('navigator' in window &&
				'userAgent' in navigator &&
				navigator.userAgent.toLowerCase()) ||
			'';
		return /focusapp_/i.test(userAgent);
	},

	/**
	 *
	 * @desc 判断是否 是FocusApp_iOS环境下
	 *       wiki地址：http://wiki.ops.focus.cn/pages/viewpage.action?pageId=9523643
	 * @return {Boolean}
	 */
	isFocusAppIOS() {
		const userAgent =
			('navigator' in window &&
				'userAgent' in navigator &&
				navigator.userAgent.toLowerCase()) ||
			'';
		return /focusapp_ios/i.test(userAgent);
	},

	/**
	 *
	 * @desc 判断是否 是FocusApp_Android环境下
	 *       wiki地址：http://wiki.ops.focus.cn/pages/viewpage.action?pageId=9523643
	 * @return {Boolean}
	 */
	isFocusAppAndroid() {
		const userAgent =
			('navigator' in window &&
				'userAgent' in navigator &&
				navigator.userAgent.toLowerCase()) ||
			'';
		return /focusapp_android/i.test(userAgent);
	},

	/**
	 *
	 * @desc 获取操作系统类型
	 * @return {String}
	 */
	getOS() {
		const userAgent =
			('navigator' in window &&
				'userAgent' in navigator &&
				navigator.userAgent.toLowerCase()) ||
			'';
		const vendor =
			('navigator' in window &&
				'vendor' in navigator &&
				navigator.vendor.toLowerCase()) ||
			'';
		const appVersion =
			('navigator' in window &&
				'appVersion' in navigator &&
				navigator.appVersion.toLowerCase()) ||
			'';

		if (/mac/i.test(appVersion)) return 'MacOSX';
		if (/win/i.test(appVersion)) return 'windows';
		if (/linux/i.test(appVersion)) return 'linux';
		if (
			/iphone/i.test(userAgent) ||
			/ipad/i.test(userAgent) ||
			/ipod/i.test(userAgent)
		) { 'ios'; }
		if (/android/i.test(userAgent)) return 'android';
		if (/win/i.test(appVersion) && /phone/i.test(userAgent)) { return 'windowsPhone'; }
	},

	/**
	 *
	 * @desc 获取滚动条距顶部的距离
	 * @return {Number}
	 */
	getScrollTop() {
		return (
			(document.documentElement && document.documentElement.scrollTop) ||
			document.body.scrollTop
		);
	},

	/**
	 *
	 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
	 * @param {HTMLElement} ele
	 * @returns { {left: number, top: number} }
	 */
	offset(ele) {
		const pos = {
			left: 0,
			top: 0
		};
		while (ele) {
			pos.left += ele.offsetLeft;
			pos.top += ele.offsetTop;
			ele = ele.offsetParent;
		}
		return pos;
	},

	/**
	 *
	 * @desc 设置滚动条距顶部的距离
	 */
	setScrollTop(value) {
		window.scrollTo(0, value);
		return value;
	},

	/**
	 *
	 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
	 * @param {Number} to
	 * @param {Number} duration
	 */
	scrollTo(to, duration) {
		const requestAnimFrame = (function() {
			return (
				window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback) {
					window.setTimeout(callback, 1000 / 60);
				}
			);
		}());

		if (duration < 0) {
			Tools.setScrollTop(to);
			return;
		}
		const diff = to - Tools.getScrollTop();
		if (diff === 0) return;
		const step = diff / duration * 10;
		requestAnimationFrame(() => {
			if (Math.abs(step) > Math.abs(diff)) {
				Tools.setScrollTop(Tools.getScrollTop() + diff);
				return;
			}
			Tools.setScrollTop(Tools.getScrollTop() + step);
			if (
				(diff > 0 && Tools.getScrollTop() >= to) ||
				(diff < 0 && Tools.getScrollTop() <= to)
			) {
				return;
			}
			Tools.scrollTo(to, duration - 16);
		});
	},

	/**
	 *
	 * @desc url 获取单个参数
	 * @param  {String} name
	 * @param  {String} url   [default: location.href]
	 * @return {String|Boolean}
	 */
	getParam(name, url) {
		if (typeof name !== 'string') return false;
		if (!url) url = window.location.href;
		// 当遇到name[xx]时，对方括号做一下转义为 name\[xxx\]，因为下面还需要使用name做正则
		name = name.replace(/[\[\]]/g, '\\$&');
		const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
		const results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	},

	/**
	 *
	 * @desc url 设置单个参数
	 * @param {String} name
	 * @param {String|Number} val
	 * @param {String} url [default: location.href]
	 * @return {String|Boolean}
	 */
	setParam(name, val, url) {
		if (typeof name !== 'string') return false;
		if (!url) url = window.location.href;
		let _name = name.replace(/[\[\]]/g, '\\$&'),
			value = `${name}=${encodeURIComponent(val)}`,
			regex = new RegExp(`${_name}=[^&]*`),
			urlArr = url.split('#'),
			result = '';

		if (regex.exec(url)) {
			result = url.replace(regex, value);
		} else if (url.indexOf('?') < 0) {
			// #/? 主要用于 vue-cli 单页应用 非 history 模式下
			result = `${urlArr[0]}#/?${value}${urlArr[1] || ''}`;
		} else {
			result = `${urlArr[0]}&${value}${urlArr[1] || ''}`;
		}

		return result;
	},

	/**
	 *
	 * @desc url 移除单个参数
	 * @param  {String} name
	 * @param  {String} url   [default:location.href]
	 * @return {String|Boolean}
	 */
	removeParam(name, url) {
		if (typeof name !== 'string') return false;
		if (!url) url = window.location.href;
		let urlparts = url.split('?'),
			prefix = encodeURIComponent(`${name}=`),
			pars = urlparts[1] ? urlparts[1].split(/[&;]/g) : '',
			i = 0,
			len = pars.length;

		for (; i < len; i++) {
			if (encodeURIComponent(pars[i]).lastIndexOf(prefix, 0) !== -1) {
				pars.splice(i, 1);
			}
		}

		url = urlparts[0] + (pars.length > 0 ? `?${pars.join('&')}` : '');

		return url;
	},

	/**
	 *
	 * @desc   判断是否为邮箱地址
	 * @param  {String}  str
	 * @return {Boolean}
	 */
	isEmail(str) {
		return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
	},

	/**
	 *
	 * @desc  判断是否为身份证号
	 * @param  {String|Number} str
	 * @return {Boolean}
	 */
	isIdCard(str) {
		return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
			str
		);
	},

	/**
	 *
	 * @desc   判断是否为手机号
	 * @param  {String|Number} str
	 * @return {Boolean}
	 */
	isPhoneNum(str) {
		return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(
			str
		);
	},

	/**
	 *
	 * @desc   判断是否为URL地址
	 * @param  {String} str
	 * @return {Boolean}
	 */
	isUrl(str) {
		return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
			str
		);
	},

	/**
	 *
	 * @desc 弹窗、蒙层...时禁止下层屏幕 滚动 ，上层仍然可以滚动。（和main.js中 页面bgColor 规则统一）
	 */
	ORIGIN_SCROLL_TOP: 0,
	lockScreen() {
		Tools.ORIGIN_SCROLL_TOP = window.scrollY || document.body.scrollTop;
		document
			.querySelector('body')
			.setAttribute(
				'style',
				`top: -${
					Tools.ORIGIN_SCROLL_TOP
				}px; position: fixed; width: 100%; height: 100%;`
			);
	},

	/**
	 *
	 * @desc 弹窗、蒙层...时禁止下层屏幕 滚动 ，上层仍然可以滚动。（和main.js中 页面bgColor 规则统一）
	 */
	unLockScreen() {
		document
			.querySelector('body')
			.setAttribute('style', 'position: relative;');
		window.scroll(0, Tools.ORIGIN_SCROLL_TOP);
	},

	/**
	 *
	 * @desc 日期格式化
	 */
	dateFormat(val, format, type, isHtml) {
		// type：上午下午？ html: 比如显示过个空格
		const t = new Date(val);
		const date = {
			'M+': t.getMonth() + 1,
			'd+': t.getDate(),
			'h+': t.getHours(),
			'm+': t.getMinutes(),
			's+': t.getSeconds(),
			'q+': Math.floor((t.getMonth() + 3) / 3),
			'S+': t.getMilliseconds()
		};
		if (/(y+)/i.test(format)) {
			format = format.replace(
				RegExp.$1,
				`${t.getFullYear()}`.substr(4 - RegExp.$1.length)
			);
		}

		for (const k in date) {
			if (type && k === 'h+') {
				const ohour = date[k];
				const desc = +ohour >= 12 ? '下午 ' : '上午 ';
				const nhour = ohour > 12 ? ohour - 12 : ohour;

				if (new RegExp(`(${k})`).test(format)) {
					format = format.replace(
						RegExp.$1,
						RegExp.$1.length == 1
							? desc + nhour
							: desc + `00${nhour}`.substr(`${date[k]}`.length)
					);
				}
			} else if (new RegExp(`(${k})`).test(format)) {
				format = format.replace(
					RegExp.$1,
					RegExp.$1.length == 1
						? date[k]
						: `00${date[k]}`.substr(`${date[k]}`.length)
				);
			}
		}
		if (isHtml && /(\s+)/i.test(format)) {
			const empty = new Array(RegExp.$1.length + 1);
			format = format.replace(RegExp.$1, empty.join('&nbsp;'));
		}
		return format;
	},

	isObject(target) {
		return !Array.isArray(target) && target instanceof Object;
	},

	walk(target, object, { deep = false } = {}) {
		// 数组或基础值直接返回
		if (!isObject(target)) {
			return;
		}

		// 将object中所有的值挂载到target上
		for (const key in object) {
			if (!object.hasOwnProperty(key)) {
				continue;
			}

			if (target.hasOwnProperty(key) && deep && isObject(target[key])) {
				walk(target[key], object[key], { deep });
			} else {
				target[key] = object[key];
			}
		}
	},

	/**
	 * 对象继承
	 * @param {object} target 目标对象
	 * @param {object} object 需要挂载的对象
	 * @param {Object} options optional 选项 { deep }
	 */
	_extends(target, object, options) {
		if (!Tools.isObject(target)) {
			throw new TypeError('target and object must be Object!');
		}
		Tools.walk(target, object, options);
	},

	/**
	 * Created by zgf on 18/3/2.
	 */
	// 生成随机字符串
	randomString(len) {
		const chars =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ0123456789';
		const maxPos = chars.length;
		let randomString = '';
		for (let i = 0; i < len; i++) {
			randomString += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return randomString;
	},
	addZero(str) {
		if (typeof str !== 'number' && typeof str !== 'string') {
			return null;
		}
		const stringStr = typeof str === 'string' ? str : str.toString();
		if (stringStr.length <= 1) {
			return `0${stringStr}`;
		}
		return stringStr;
	},
	// 日期加n天
	addDays(date, n) {
		const newDate = new Date(date + 86400000 * n);
		return `${newDate.getFullYear()}-${Tools.addZero(newDate.getMonth() + 1)}-${Tools.addZero(newDate.getDate())}`;
	},
	// 从今天开始加n天
	addDay(num) {
		return `${Tools.addDays(new Date().setHours(0, 0, 0, 0), num).slice(5).replace('-', '月')}日`;
	},
	// 日期格式化
	formatDate() {
		let date = '';
		if (new Date().getDay() == 5) {
			date = `${Tools.addDay(1)} ，${Tools.addDay(2)}`;
		} else if (new Date().getDay() == 6) {
			date = Tools.addDay(2);
		} else {
			date = Tools.addDay(1);
		}
		const timeArr = date.split('，');
        let ConnectionDate = '';
		if (timeArr.length == 1) {
			ConnectionDate = new Date().getFullYear() + timeArr[0].match(/\d{2}/g).join('');
		} else {
			ConnectionDate = timeArr.map(item => new Date().getFullYear() + item.match(/\d{2}/g).join('')).join('-');
		}
		return ConnectionDate;
	}

};

export default Tools;
// if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
//     module.exports = Tools;
// } else {
//     window.Tools = Tools;
// }
