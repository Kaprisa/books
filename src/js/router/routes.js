import App from '../components/App'
import AddBook from '../pages/AddBook'
import List from '../pages/List'

export default [

    { path: '/', component: App, children: [
            {path: '', component: List },
            {path: '/add', component: AddBook},
            {path: '/books/:id/edit', component: AddBook}
    ]}
]
