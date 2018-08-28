import axios from 'axios';

import qs from 'qs';

import md5 from 'md5';

/**
 *
 * @desc 封装axios，减少学习成本，参数基本跟jq ajax一致
 * @param {String} type [default: GET]                     请求的类型
 * @param {String} url			                           请求地址
 * @param {String} time  [default: 10s]			           超时时间
 * @param {Object} data		               	               请求参数
 * @param {Boolean} withCredentials  [default: false]	   是否携带cookie
 * @param {String} dataType         		               预期服务器返回的数据类型，xml html json ...
 * @param {Object} headers          		               自定义请求headers
 * @param {Function} success            	               请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
 * @param {Function} error		                           发送请求前
 * @return {Promise}
 */

const ajax = function(config) {
    const configs = config || {};
    if (!configs.url) {
        console.error('请填写接口地址');
        return false;
    }

    axios.defaults.params = {};
    axios.defaults.data = {};
    // md5加密
    let signValue = '';
    if (configs && configs.secretKey) {
        const key = configs.secretKey;
        // const signal = Object.assign({}, configs.data, { secretKey: key });
        const signal = configs.data;
        let raw = Object.keys(signal)
            .sort((a, b) => (a > b ? 1 : -1))
            .map(key => `${key}=${signal[key]}`)
            .join('&');
        raw = `${raw}&secretKey=${key}`;
        signValue = md5(raw);
    }

    // 区分post、get请求
    if (configs.type.toUpperCase() === 'POST') {
        let postData = configs.data || {};

        const tempData = {
                        ...postData
                        };
        if (signValue) {
            tempData.sign = signValue;
        }
        if (configs.headers && configs.headers['Content-Type'] &&
            configs.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
                postData = qs.stringify(tempData);
        }
        axios.defaults.data = postData;
        // console.log(axios.defaults.data);
    } else if (configs.type.toUpperCase() === 'GET') {
        if (signValue) {
            configs.data.sign = signValue;
        }
        axios.defaults.params = configs.data || {};
    }

    axios({
        method: configs.type || 'get',
        url: configs.url,
        headers: configs.headers || {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        // baseURL: '',
        withCredentials: configs.withCredentials || false,
        timeout: configs.time || 10 * 1000,
        responseType: configs.dataType || 'json'
    }).then(res => {
        if (res.status == 200) {
            if (configs.success) {
                configs.success(res.data, res);
            }
        } else if (data.error) {
                configs.error(error);
            } else {
                console.error('[timeout] 访问人数过多，请稍后重试');
            }
    }).catch(error => {
        console.error(error);
        if (configs.error) {
            configs.error(error);
        } else {
            console.error('[timeout] 访问人数过多，请稍后重试');
        }
    });
};

export default ajax;
