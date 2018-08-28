import $$util from 'util'

export default {
    name: 'common-dialog',
    data() {
        return {
            closed: true,
            title: '',
            tpl: '',
            isError: false,
            btns: [],
            events: []
        }
    },
    watch: {
        closed(newVal, oldVal) {
            !newVal ? $$util.lockScreen() : $$util.unLockScreen()
        }
    },
    methods: {

        trigger(index) {
            const that = this
            if (that.btns.length > 0) {
                that.events[index] && that.events[index](that)
            }
        },
        close() {
            this.closed = true
            setTimeout(() => {
                this.$destroy(true)
                !!this.$el && this.$el.parentNode.removeChild(this.$el)
            }, 100)
        },
        destroyInstance() {
            !this.closed && this.close()
        },
        // 监听浏览器自带前进后退事件 -- destroy dialog 实例
        onPopStateFn() {
            if (window.history && window.history.pushState) {
                window.addEventListener('popstate', this.destroyInstance, false)
            }
        },
        offPopStateFn() {
            if (window.history && window.history.pushState) {
                window.removeEventListener('popstate', this.destroyInstance, false)
            }
        }

    },
    mounted() {
        // this._bindEvents()
        this.onPopStateFn()
    },
    destroyed() {
        this.offPopStateFn()
    }
}
