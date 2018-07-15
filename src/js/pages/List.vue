<template>
    <div>
        <v-header
                @search="search"
                @change-sort-value="v => { order = v; changeBooks() }"
                @change-sort-direction="v => { direction = v; changeBooks() }"
        />
        <div class="books-list">
            <card class="books-list__item" v-for="book in books" :book="book" :key="book.id"></card>
        </div>
        <pagination :items="count" @change-active="handleChangeActive"/>
        <snackbar @change-visible="snackbar.visible = !snackbar.visible" :options="snackbar"/>
    </div>
</template>

<script>

    import axios from 'axios'
    import {wrap} from '../helpers/processError'
    import Card from '../components/Card'
    import VHeader from '../components/Header'
    import Pagination from '../components/Pagination'
    import Snackbar from '../components/Snackbar'

    export default {
        components: {
            Card,
            VHeader,
            Pagination,
            Snackbar
        },
        data() {
            return {
                limit: window.innerWidth > 1800 ? 10 : 8,
                offset: 0,
                books: [],
                filteredBooks: [],
                count: 0,
                searchQuery: '',
                snackbar: {},
                order: 'date',
                direction: 'ASC'
            }
        },
        async mounted() {
            const snack = await wrap(this.changeBooks)
            if (snack.error)
                this.snackbar = snack
        },
        methods: {
            handleChangeActive(index) {
                this.offset = (index - 1) * this.limit
                this.changeBooks()
            },
            async changeBooks() {
                const {data} = await axios.get(`/api/books?limit=${this.limit}&offset=${this.offset}&like=${this.searchQuery}&order=${this.order}&direction=${this.direction}`)
                this.books = data.books
                this.count = Math.ceil(data.count / this.limit)
            },
            search(v) {
                this.searchQuery = v
                this.changeBooks()
            }
        }
    }
</script>
