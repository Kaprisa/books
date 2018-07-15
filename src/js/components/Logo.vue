<template>
    <div class="logo" @click="$router.push('/')">
        <img class="logo__image" :src="require('../../images/book.svg')" alt="">
        <span class="logo__text">Books</span>
    </div>
</template>
