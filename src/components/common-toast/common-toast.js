export default {
    name: 'common-toast',
    data () {
        return {
            tip: '',
            duration: 2000,
            type: 'simple'
        }
    },
    methods: {

    },
    mounted () {
        setTimeout(() => {
            this.$destroy(true);
            !!this.$el && this.$el.parentNode.removeChild(this.$el);
        }, this.duration);
    }
}
