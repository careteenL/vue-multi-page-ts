# 基于Sass的CSS基础库

## Usage - 使用

前提条件：项目配置了SASS

```
// 先在项目入口处 加入 normalize.scss ，里面包括 global 和 reset
require('/path/to/common-ui/normalize.scss')

// 然后再在需要使用可复用的css代码片段的 scss 文件中 import util.scss
@import '/path/to/common-ui/util.scss'

```

你项目的所有图片资源可放置在 `img` 目录下统一管理

引入`util.scss` 后通过 `@include bg('img_name.png')` 即可使用图片作为背景

** 注意： **

- 可将你当前项目的 字体、字体大小、颜色、z-index等统一的风格 在`core/_base.scss`中修改
- 若有可复用的CSS代码片段，可在`core/_mixin.scss`文件中加入

## Core - 核心文件

- `normalize.scss`      (入口文件，引入_global和_reset文件)
- `util.scss`           (工具文件，引入_base和_mixin文件)
- `_global.scss`        (全局样式)
- `_reset.scss`         (样式归零)
- `_base.scss`          (基础变量：常用颜色、字体...)
- `_mixin.scss`         (功能样式，包括：mixin(混合)、%(placeholder选择器)、function(函数) 、media(媒体查询)几大部分)

## Wiki -

#### 清除浮动

`@extend %clearfix`

#### 单行文本溢出展示省略号...

前提条件是设置元素宽度，才可以应用省略号

`@extend %ellipsis`

#### 多行文本溢出展示省略号...

`@param {String} $lineCount        [default: 1] 至多显示行数`

`@include multi-ellipsis ($lineCount: 1)`

#### 背景图片

图片资源放置在`img`下统一管理

`bg ($img, $left: 0, $top: 0, $size: contain, $repeat: no-repeat, $pos: false)`

#### 实心带颜色三角

`triangle ($direction, $size, $borderColor: #ccc)`

```css
    @param {String} $direction          [left, right, top, bottom] 三角尖朝向
    @param {String} $size               [10px...] 三角大小
    @param {String} $borderColor        [default: #ccc]
    @example  @include triangle(top, 10px, #ccc);
```

#### 移动端1px单方向

```css
    @param {String} $direction        [left, right, top, bottom] 1px显示的位置方向
    @param {String} $color            [default: #D5D5D5] 1px颜色
    @param {String} $offset           [default: 0] 1px在显示位置方向上的偏移量,设置50%时可实现1px居中
    @example  @include m-1px-sd(top, #fff);
```

#### 移动端1px四周

```css
    @param {String} $Color            [left, right, top, bottom] 各边颜色
    @param {String} $radius           [default: 0] border-radius
    @example  @include m-1px-all(#fff, #fff,#fff, #fff, 5px);
```

#### 移动端1px四周边框颜色相同

```css
    @param {String} $Color            [default: transparent] 各边颜色
    @param {String} $radius           [default: 0] border-radius
    @example  @include m-1px-all-same(#fff, 10px);
```

#### loading 动画

`@example animation: ani-loading 0.9s linear infinite;`
