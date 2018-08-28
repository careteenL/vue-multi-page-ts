const decorationCost = (() => {
    let result = []
    // #0718 新增 0 
    result[0] = {
        id: '0',
        name: '0'
    }
    result[1] = {
        id: '500',
        name: '500'
    }
    for (var i = 2; i < 11; i++) {
        result.push({
            id: '' + (i * 1000),
            name: '' + (i * 1000)
        })
    }
    for (var i = 12; i < 17; i++) {
        result.push({
            id: '' + ((i - 11) * 10000),
            name: (i - 11) + '万'
        })
    }
    return result
})()

export default {
    // 户型
    houseTypeOption: [
        (() => {
            let result = []
            for (var i = 1; i < 11; i++) {
                result.push({
                    id: '' + i,
                    name: i + '室'
                })
            }
            return result
        })(),
        (() => {
            let result = []
            for (var i = 0; i < 11; i++) {
                result.push({
                    id: '' + i,
                    name: i + '厅'
                })
            }
            return result
        })(),
        (() => {
            let result = []
            for (var i = 0; i < 11; i++) {
                result.push({
                    id: '' + i,
                    name: i + '卫'
                })
            }
            return result
        })()
    ],
    // 装修费用
    decorationCostOption: [
        decorationCost,
        [
            {
                id: '1',
                name: '~'
            }
        ],
        decorationCost
    ]
}
