<template>
    <div class="form__group">
        <label v-if="title" class="form__label">{{ title }}</label>
        <textarea
                ref="textarea"
                class="form__field"
                style="resize: none"
                v-model="value"
        ></textarea>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               value: null,
                minHeight: 50
            }
        },
        props: {
            title: "",
            text: ""
        },
        mounted() {
            this.resize()
        },
        methods: {
            resize: function () {
                this.$refs.textarea.style.setProperty('height', 'auto')
                let contentHeight = this.$refs.textarea.scrollHeight + 1
                if (this.minHeight) {
                    contentHeight = contentHeight < this.minHeight ? this.minHeight : contentHeight
                }
                if (this.maxHeight) {
                    if (contentHeight > this.maxHeight) {
                        contentHeight = this.maxHeight
                        this.maxHeightScroll = true
                    } else {
                        this.maxHeightScroll = false
                    }
                }
                const heightVal = contentHeight + 'px'
                this.$refs.textarea.style.setProperty('height', heightVal)
                return this
            }
        },
        watch: {
            text () {
                this.value = this.text
            },
            value (value) {
                this.$nextTick(this.resize)
                this.$emit('text-change', value)
            }
        }
    }
</script>
