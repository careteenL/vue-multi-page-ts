import $$util from 'util';

require('lib/bridge.js');

let count = 0;

let timer = null;

const onTouchStart = e => {
	count++;
	if (count >= 5) {
		const url = prompt('input test url', '');
		if (url !== null && url !== '') {
             if (/.*_iOS_.*/.test(navigator.userAgent)) {
                 HFWVBridge.runNative('newWebPage', {
                         newURL: url,
                         needBanner: 2
                     }, () => {}
                 );
             } else {
                 try{
                    window.WebViewJavascriptBridge.callHandler(
                        'newWebPage',
                        {
                            newURL: url,
                            needBanner: 2
                        },
                        responseData => {
                            console.log(responseData);
                        }
                    );
                 }catch(error){
                     alert(error)
                 }
             }
        }
        count = 0;
        return;
	}
	if (timer) {
		clearTimeout(timer);
	}
	timer = setTimeout(() => {
		count = 0;
	}, 200);
};

if (!(/\.focus\./.test(location.host))) {
    window.addEventListener('touchstart', onTouchStart);
    HFWVBridge.wrapNativeFn(['newWebPage']);
}
