import session from 'koa-generic-session'
import convert from 'koa-convert'

export default app => app.use(convert(session({
    cookie: {

    }
})))
