## 说明

Vue多页面+TypeScript

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
src/page/demo | 页面
src/page/*/router | 前端路由配置
src/page/*/service | 接口服务层
src/page/*/store | Vuex 全局状态层
src/page/*/views | 每一个页面下的子页面
src/skeleton | 骨架页配置
src/config.js | 全局域名等变量维护
src/publish.js | 发布脚本

## 新增页面

- 对`src/page/demo/*`目录直接拷贝一份，重命名后即可开发，不在此做其他配置。

## mock

mock解决方案有很多种，此项目中采用的方案有2个特点：

```
1、mock的开关不侵入业务代码
2、mock文件自动生成
```

不侵入业务代码 是指修改mock开关只影响本地开发环境，不应该影响测试或线上。 所以建议把接口域名统一写在config文件里，在proxy模式即本地环境下进行控制。

约定以/MOCK开头的api是mock数据，自动在mock目录下生成以路径化的json文件

