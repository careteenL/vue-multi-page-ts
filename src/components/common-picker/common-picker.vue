<template>
    <div class="picker-box" v-show="!closed">
        <div class="picker-wrapper">
            <template v-if="showType === 'slide'">
                <div class="picker-title flex">
                    <div class="cancel-btn cell" @click="close">取消</div>
                    <div class="middle-btn cell" v-if="showMiddleBtn" @click="middleFn">
                        {{middleTxt}}
                    </div>
                    <div class="confirm-btn cell" @click="getVal">确定</div>
                </div>
                <div class="picker-list" :style="{height: height*line +'px'}">
                    <div class="datemark" :style="{top: height*hackLine +'px'}"></div>
                    <div class="datescroll ">
                        <div v-for="(column , index) of getData"
                        :id="'column-' + index"
                        onloadedmetadata=""
                        :key="index"
                        :style="[{width: (100/columns) + '%'}, {left: (100/columns*index) + '%'}]">
                        <ul >
                            <li :class="[{'select-item': selects[index] === didx} ]"
                                v-for="(d, didx) of data[index]"
                                v-html="d.name"
                                :key="didx"
                                :data-e="selects[2]">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </template>
            <template v-if="showType === 'layer'">
                <div class="layer-picker-wrap">
                    <ul class="layer-picker-wrap_list">
                        <li v-for="(d, didx) of data[0]"
                            class="layer-picker-wrap_item"
                            :key="didx"
                            @click="layerClick(d, didx)"
                            v-html="d.name">
                        </li>
                    </ul>
                </div>
            </template>
        </div>
        <div class="hack-mask" v-if="showHackMask"></div>
    </div>

</template>

<script src="./common-picker.js">
</script>

<style lang="scss" scoped src="./common-picker.scss">
</style>
