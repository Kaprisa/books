<template>
    <div class="add-book" style="background-image: url(/images/bg.jpg)">
        <form class="form">
            <div class="back-wrapper" @click="$router.back()"><span class="back">←</span> Назад</div>
            <h1 class="title">{{ book.id ? 'Обновление' : 'Добавление'}} книги</h1>
            <photo-uploader @upload-file="f => book.image = f" :filename="book.image"/>
            <field title="Название" @value-change="v => book.title = v" :value="book.title"/>
            <field title="Автор" @value-change="v => book.author = v" :value="book.author"/>
            <field title="Год создания" @value-change="v => book.date = v" :value="book.date"/>
            <v-text-area title="Описание" name="description" @text-change="v => book.description = v" :text="book.description"/>
            <button class="btn btn--primary" @click.prevent="save">Сохранить</button>
        </form>
        <snackbar @change-visible="snackbar.visible = !snackbar.visible" :options="snackbar" />
    </div>
</template>

<script>
    import Field from '../components/FormField'
    import VTextArea from '../components/Textarea'
    import PhotoUploader from '../components/PhotoUploader'
    import Snackbar from '../components/Snackbar'
    import { wrap } from '../helpers/processError'
    import axios from 'axios'
    require('../../images/bg.jpg')
    export default {
        components: {
            Field,
            VTextArea,
            PhotoUploader,
            Snackbar
        },
        async mounted() {
            const { id } = this.$route.params
            if (id) {
                const { data } = await axios.get(`/api/books/${id}`)
                this.book = data
                this.book.author = data.name
            }
        },
        data() {
            return {
                book: {
                    image: 'f1.jpeg'
                },
                snackbar: {},
                message: ''
            }
        },
        methods: {
            async save() {
                this.snackbar = await wrap(async _ => {
                    if (this.book.id) {
                        const { data } = await axios.put(`/api/books/${this.book.id}`, this.book)
                        this.message = data
                    } else {
                        const {data} = await axios.post('/api/books/create', this.book)
                        this.message = data
                    }
                })
                this.snackbar.text = this.message
            }
        }
    }
</script>
