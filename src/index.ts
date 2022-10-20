import server from './server'
import { Logger } from './utils/logger'
import { getDbConnection, MongoDB } from './data/connections/mongodb-connection'
import { createUserRouter } from './routers/user-router'
import { Login, Signup } from './use-cases/users'
import { UserRepository } from './repositories/user-repository'
import { MongoDbDataSource } from './data/sources/mongodb-data-source'
Logger.setLogger()

server.use(Logger.httpLogger())
;(async () => {
    const db = await getDbConnection()
    const userSource = new MongoDbDataSource(new MongoDB(db, 'users'))
    const userRepository = new UserRepository(userSource)
    const userMiddleware = createUserRouter(new Login(userRepository), new Signup(userRepository))
    server.use('/user', userMiddleware)
    server.get('/', (req, res) => res.send('LOL CONGRATS'))
    server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))
})()
