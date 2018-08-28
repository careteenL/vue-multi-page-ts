## 说明

卖房app内嵌发布房源h5 单页多路由

## 开发

- vue不多讲

- 自测时账号

    - 前往 [开放平台审核后台](http://shengtai-admin-mp.focus-test.cn/ecology-mp-admin#/account/list)查找经纪人账号

        - 可再前往[用户中心管理系统](http://shengtai-admin-user.focus-test.cn/user-admin?ADMIN_ROLE=0#/user/info)强制登录；
        - 也可使用验证码登录，前往[短信查询](http://qa.ops.focus.cn/sms/sms)拦截验证码登录。

- 测试环境访问地址： http://broker-fe.focus-test.cn/fangyuan/

## 目录结构

路径 | 内容
:--- | :---
build | 构建及webpack配置文件
config | 本地服务及构建配置文件
src | 项目源码
src/api | 封装axios
src/assets | scss、js等可复用和工具文件
src/components | 公共组件
src/page | 多页面
src/page/broker | 经纪人页面
src/page/broker-share | 经纪人以老带新页面
src/page/expert | expert页面
src/page/fangyuan | 房源页面
src/page/*/router | 前端路由配置
src/page/*/service | 接口服务层
src/page/*/store | Vuex 全局状态层
src/page/*/views | 每一个页面下的子页面
src/skeleton | 骨架页配置
src/config.js | 全局域名等变量维护
src/publish.js | 发布脚本

## 新增页面

- 对`src/page/broker-share/*`目录直接拷贝一份，重命名后即可开发，不在此做其他配置。

- 部署到测试环境之前
    - 前往`http://code.ops.focus.cn/system/broker-fe`
    ```
    git clone git@code.ops.focus.cn:system/broker-fe.git
    ```
    - 前往[/code/app/controller/home.js](http://code.ops.focus.cn/system/broker-fe/blob/dev/code/app/controller/home.js) 增加一份页面配置
    - 前往[/code/app/router.js](http://code.ops.focus.cn/system/broker-fe/blob/dev/code/app/router.js)增加一份页面访问配置
- 构建部署后即可根据配置路由访问新增页面

## model

默认使用的是sfax, 其实在移动端没啥必要，采用fetch axios也都可以， 重新封装api/request.js即可

建议api统一管理，只体现url, 这样比较清晰，请求或响应的数据格式转化等的处理过一层service

## mock

mock解决方案有很多种，此项目中采用的方案有2个特点：

```
1、mock的开关不侵入业务代码
2、mock文件自动生成
```

不侵入业务代码 是指修改mock开关只影响本地开发环境，不应该影响测试或线上。 所以建议把接口域名统一写在config文件里，在proxy模式即本地环境下进行控制。

约定以/MOCK开头的api是mock数据，自动在mock目录下生成以路径化的json文件

## skeleton

首屏加载引用骨架屏，取代loading图、进度条，优化用户体验。

`npm run build`之后，构建jekins之前，将骨架代码自动化注入`index.html`。

作为模板的html文件，需要添加占位符`<!--vue-ssr-outlet-->`

```html
<div id="app">
 <!--vue-ssr-outlet-->
</div>
```
只需执行一次，不用每次部署都执行。

```bash
npm run skeleton
```

## 附录

- system仓库 http://code.ops.focus.cn/system/broker-fe
- jekins http://10.23.48.112:8080/job/app-fangyuan-h5/ 账号：admin-fangyuan 密码：admin
- rscode http://rscode.ops.focus.cn/project/303/
