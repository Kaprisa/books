<template>
    <div class="card">
        <div class="card__side card__side--front">
            <div class="card__picture" :style="{ backgroundImage: `url(images/${book.image})` }">
                &nbsp;
            </div>
            <div class="card__details">
                <ul>
                    <li>{{book.title}}</li>
                    <li>{{book.name}}</li>
                    <li>{{book.date}}</li>
                </ul>
            </div>
        </div>
        <div class="card__side card__side--back">
            <h2 class="card__title">{{book.title}}</h2>
            <div class="card__description" v-html="book.description">{{book.description}}</div>
            <a class="btn btn--primary" @click="$router.push(`/books/${book.id}/edit`)">Редактировать</a>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            book: Object
        }
    }
</script>
