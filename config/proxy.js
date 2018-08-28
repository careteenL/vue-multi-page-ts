const path = require('path'),
    fs = require('fs');
const serverCfg = require('./index').dev,
    map = serverCfg.proxyTable;
let tmp = [];

Object.keys(map).map(rule => {
    tmp.push({
        path: rule,
        target: map[rule],
        changeOrigin: true,
        pathRewrite: {
            ['^' + rule]: ''
        },
        cookieDomainRewrite: {
            "*": serverCfg.host
        },
        bypass: function (req, res, proxyOptions) {
            // mock模式下，若不存mock文件 会自动创建
            if (/\/mock/.test(req.url)) {
                createMockSync(path.join(__dirname, '../', req.url))
            }
        }
    })
})
/* mock 数据*/
tmp.push({
    path: '/MOCK',
    target: `http://${serverCfg.host}:${serverCfg.port}/mock`,
    changeOrigin: true,
    pathRewrite: {
        ['^\/MOCK/([^\\?]*)(\\?.*)?$']: '/$1.json'
    }

})
module.exports = tmp;
function createMockSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (createMockSync(path.dirname(dirname), mode)) {
            if (/\.json$/.test(dirname)) { // 需要创建文件
                fs.writeFileSync(dirname,
                    `
{
    "data": {},
    "msg": "mock数据自动创建，请修改",
    "code": 1
}
`,
                    'utf-8');
                console.log(`mock文件：${dirname} 已自动创建！`);
            } else {
                fs.mkdirSync(dirname, mode);
            }
            return true;
        }
    }
};
