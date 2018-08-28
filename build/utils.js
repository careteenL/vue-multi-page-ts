'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const packageConfig = require('../package.json')
const fs = require('fs')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '/broker-fe/'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的page文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/page')
const pages = fs.readdirSync(PAGE_PATH);

//多入口配置
exports.entries = function() {
    var map = {}
    pages.forEach(page => {
        map[page] = path.resolve(PAGE_PATH, page, `index.js`)
    })
    return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取page文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
    let arr = []
    pages.forEach(page => {
        let conf = {
            // 模板来源
            template: path.resolve(PAGE_PATH, page, `index.html`),
            // 文件名称
            filename: page + '.html',
            // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
            chunks: ['manifest', 'vendor', page],
            inject: true
        }
        if (process.env.NODE_ENV === 'production') {

            conf = merge(conf, {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                chunksSortMode: 'dependency'
            })
        }
        arr.push(new HtmlWebpackPlugin(conf))
    })
    return arr
}


exports.generateIndex = function() {

    let listTpl = ['<h3>page</h3>'];
    pages.forEach(page => {

        listTpl.push('<dl>')

        // listTpl.push(
        //     `<dt style="text-indent:20px"><a href="//${config.dev.host}:${config.dev.port}/${page}.html" >${page}</a ></dt >`);

        listTpl.push(
            `<dt style="text-indent:20px"><a href="${page}.html" target="_blank">${page}</a ></dt >`);

        const routerCtx = fs.readFileSync(path.resolve(PAGE_PATH, page, `router/index.js`), 'utf8');

        const patt = /path\s*\:\s*[\'\"](.*)\s*[\'\"]\s*\,/g;
        let result;

        while ((result = patt.exec(routerCtx)) != null)  {
          listTpl.push(
              `<dd style="line-height:32px"><a href="${page}.html#${result[1]}" target="_blank">#${result[1]}</a ></dd >`);
         }

         listTpl.push('</dl>')
    })

    const dist = path.resolve(__dirname, '../dist');
    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist);
    }
    fs.writeFileSync(`${dist}/list.html`, listTpl.join(' '), 'utf8')
}
