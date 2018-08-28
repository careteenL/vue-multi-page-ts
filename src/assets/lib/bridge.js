/**
 *
 * @desc H5 与 App 交互
 * @author careteen.wang
 * @lastModified {2018.04.11}
 * @github https://github.com/careteenL/JsAndAppInteraction
 * @example
     ```
     // 更具体使用参考 https://github.com/careteenL/JsAndAppInteraction
     // 引入依赖
     require('/path/to/bridge.js')
     // 由于 Android 端同学使用 JSBridge，而 IOS 端同学使用 WebKit，没有统一，所以需要区分。
     // IOS 。包裹和 APP 同学约定好的方法名
     HFWVBridge.wrapNativeFn(['login']);
     // 在事件中触发 唤起APP
     if (isFocusAppIOS()) {
         HFWVBridge.runNative('login', {
             name: '搜狐网友'
         }, function() {
             alert('欢迎来到搜狐');
         })
     } else {
         // Android
         window.WebViewJavascriptBridge.callHandler(
             'submitFromWeb'
             , {'param': '中文测试'}
             , function(responseData) {
                 document.getElementById("show").innerHTML = "send get responseData from java, data = " + responseData
             }
         );
     }
     ```
 */
!(function(w) {
  let nativeObject = 'NativeApp'; // 原生注入的对象
  let ts = +new Date(); // 匿名回调基础时间戳
  let callbacks = {}; // 回调
  let nativeFns = {}; // 原生方法

  // 添加回调
  function add(name, fn) {
    if (typeof fn !== 'function') return false;
    if (!callbacks[name]) {
      callbacks[name] = fn;
      return true;
    } 
      return false;
    
  }

  // 删除回调
  function remove(name) {
    if (callbacks[name]) {
      delete callbacks[name];
    }
  }

  // 包裹Native 方法
  function wrap(name) {
    if (nativeFns[name]) return;
    nativeFns[name] = function(obj, cb) {
      if (typeof cb === 'function') {
        obj.cb = `__cb__${  ts++}`;
        add(obj.cb, cb);
      }
      let jsonString = JSON.stringify(obj);
      if (w[nativeObject]) {
        w[nativeObject][name](jsonString);
      } else if (window.webkit.messageHandlers) {
          window.webkit.messageHandlers[name].postMessage(jsonString);
      }
    };
  }

  // 调用JS方法
  function runJS(name, jsonString) {
    try {
      let json = JSON.parse(jsonString || '{}');
      if (callbacks[name]) {
        callbacks[name](json);
      }
      // 删除一次性回调
      if (name.indexOf('__cb__') === 0) {
        remove(name);
      }
    } catch (e) {
      console.error(e);
    }
  }
  // 调用Native方法
  function runNative(name, params, cb) {
      // alert('runNative');
    if (!nativeFns[name]) return false;
    if (typeof params === 'undefined') {
      params = {};
    }
    if (typeof params === 'function') {
      cb = params;
      params = {};
    }
    nativeFns[name](params, cb);
    return true;
  }
  // ios
  w.HFWVBridge = {
    setNativeObject (no) {
      nativeObject = no;
    },
    wrapNativeFn (names) {
      if (Array.isArray(names)) {
        names.forEach(function (name) {
          wrap(name);
        })
      } else {
        wrap(names);
      }
    },
    runJS,
    runNative,
    add,
    remove,
    native: {
        login(){
            NativeApp.login();
        }
    }
  };

  // android
  function connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
          callback(WebViewJavascriptBridge);
      } else {
          document.addEventListener(
              'WebViewJavascriptBridgeReady'
              , () => {
                  callback(WebViewJavascriptBridge)
              },
              false
          );
      }
  }

  connectWebViewJavascriptBridge((bridge) => {
      bridge.init(function(message, responseCallback) {
          console.log('JS got a message', message);
          var data = {
              'Javascript Responds': '测试中文!'
          };

          if (responseCallback) {
              console.log('JS responding with', data);
              responseCallback(data);
          }
      });

      bridge.registerHandler("functionInJs", function(data, responseCallback) {
          // document.getElementById("show").innerHTML = ("data from Java: = " + data);
          if (responseCallback) {
              var responseData = "Javascript Says Right back aka!";
              responseCallback(responseData);
          }
      });
  });
}(window));
