<template>
    <div class="toast">
        <div v-if="type === 'loading'" class="toast-loading">
            <i class="toast_loading_icon"></i>
            <p class="toast_tip" v-html="tip"></p>
        </div>
        <div v-if="type === 'simple'" class="toast-simple">
            <p class="toast_tip" v-html="tip"></p>
        </div>

    </div>
</template>

<script src="./common-toast.js">

</script>

<style lang="scss" scoped src="./common-toast.scss">
</style>
