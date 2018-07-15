<template>
    <div class="form__group">
        <label v-if="title" class="form__label">{{ title }}</label>
        <input
                :type="type"
                class="form__field"
                :value="value"
                @input="e => $emit('value-change', e.target.value)"
        >
    </div>
</template>

<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: "text"
            },
            title: String
        }
    }
</script>
