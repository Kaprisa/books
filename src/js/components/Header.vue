<template>
    <header class="header">
        <logo />
        <dropdown :items="sortItems" @change="v => $emit('change-sort-value', v)"/>
        <dropdown :items="directionItems" @change="v => $emit('change-sort-direction', v)"/>
        <search @change="v => $emit('search', v)"/>
        <a @click="$router.push('/add')" class="btn_add">Добавить книгу</a>
    </header>
</template>

<script>
    import Logo from './Logo'
    import Search from './Search'
    import Dropdown from './Dropdown'
    export default {
        components: {
            Logo,
            Search,
            Dropdown
        },
        data() {
           return {
               sortItems: {['u.name']: 'По автору', date: 'По дате', title: 'По названию'},
               directionItems: {ASC: 'По возрастанию', DESC: 'По убыванию'},
           }
        }
    }
</script>
