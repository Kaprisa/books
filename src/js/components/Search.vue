<template>
    <div class="search">
        <input type="text" class="search__input" @input="e => $emit('change', e.target.value)">
        <img class="search__icon" :src="require('../../images/search.svg')" alt="">
    </div>
</template>

<script>
    export default {

    }
</script>
