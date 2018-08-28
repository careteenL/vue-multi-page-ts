<template>
	<div class="activity-rules">
		<CommonHeader title="Careteen-Blog" :action="true" @goBack="goBack" :isCustom="true"/>
    <section class="activity-rules__content">
      <p>欢迎访问<a href="http://blog.careteen.wang">我的博客</a></p>
    </section>
	</div>
</template>

<script>
import CommonHeader from '@components/common-header/common-header.vue'

export default {
	components: {
		CommonHeader
	},
	data() {
		return {
			
		}
	},
	methods: {
		goBack () {
      this.$router.push({
        path: '/share'
      })
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../assets/common-ui/util.scss';
.activity-rules {

  &__content {
    margin-top: 44px;
    font-size: 16px;
    color: #556;
    line-height: 1.5;
    padding: 15px;
  }
}
</style>

