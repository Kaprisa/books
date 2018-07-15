import Vue from 'vue'

import App from './components/App'

// import store from './store'
import router from './router'

const app = new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<app/>',
    // store,
    router,
})
