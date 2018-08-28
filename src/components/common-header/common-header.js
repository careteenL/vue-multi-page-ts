/**
 *
 * @desc common-header
 * @param {Function} goBack 左边回退事件
 * @param {Boolean} action [default: fasle] 左边是否为事件
 * @param {String} link action为false时，左边跳转链接
 * @param {String} title 标题
 * @param {String} titleLink 标题跳转链接
 * @param {String} tip 右边提示语
 * @param {Boolean} tipActive 右遍提示语是否激活
 * @param {String} tipLink 右边提示语跳转链接
 * @param {Any} tipAction 右边提示语为事件时 text或icon ,icon时可选项 [icon-help, icon-date]
 * @param {Function} tipHandle 右边提示语事件
 * @example
             ```
             <common-header title="选择房源特色"
                 :action="true"
                 @goBack="goBack"
                 tipAction="icon-help"
                 @tipHandle="tipHandle"
                 class="common-header-cur">
             </common-header>
             ```
 * @author Careteen
 * @recentUpdate 2018-05-25
 */
import $$util from '@util'

export default {
    name: 'common-header',
    data() {
        return {
        }
    },
    props: {
        link: {
            type: String,
            default: '/'
        },
        action: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        titleLink: {
            type: String,
            default: ''
        },
        tip: {
            type: String,
            default: ''
        },
        tipActive: {
            type: Boolean,
            default: true
        },
        tipLink: {
            type: String,
            default: 'javascript:;'
        },
        tipAction: {
            type: String,
            default: ''
        }
    },
    computed: {
        tipActionReal(val) {
            switch (this.tipAction) {
                case 'icon-help':
                    return ''
                    break
                case 'icon-date':
                    return ''
                    break
                case 'icon-add':
                    return ''
                    break
                case 'icon-delete':
                    return ''
                    break
                default:
                    return this.tipAction
            }
        },
        tipClass(val) {
            switch (this.tipAction) {
                case 'icon-help':
                    return 'icon-help'
                    break
                case 'icon-date':
                    return 'icon-date'
                    break
                case 'icon-add':
                    return 'icon-add'
                    break
                case 'icon-delete':
                    return 'icon-delete'
                    break
                default:
                    return ''
            }
        }
    },
    methods: {
        goBack() {
            this.$emit('goBack')
        },
        tipHandle() {
            if (this.tipActive) {
                this.$emit('tipHandle')
            }
        }
    }
}
