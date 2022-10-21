import server from './server'
import { Logger } from './utils/logger'
import { getDbConnection, MongoDB } from './data/connections/mongodb-connection'
import { createUserRouter } from './routers/user-router'
import { Login, Signup } from './use-cases/users'
import { UserRepository } from './repositories/user-repository'
import { MongoDbDataSource } from './data/sources/mongodb-data-source'
import { ContactRepository } from './repositories/contact-repository'
import { createContactRouter } from './routers/contact-router'
import { CreateContact, DeleteContact, GetAllContacts, UpdateContact } from './use-cases/contacts'
Logger.setLogger()

server.use(Logger.httpLogger())
;(async () => {
    const db = await getDbConnection()
    /** CONFIGURING USER ROUTE AND MIDDLEWARE*/
    const userSource = new MongoDbDataSource(new MongoDB(db, 'users'))
    const userRepository = new UserRepository(userSource)
    const userMiddleware = createUserRouter(new Login(userRepository), new Signup(userRepository))
    server.use('/user', userMiddleware)
    /** CONFIGURING CONTACT ROUTE AND MIDDLEWARE */
    const contactSource = new MongoDbDataSource(new MongoDB(db, 'contacts'))
    const contactRepository = new ContactRepository(contactSource)
    const contactMiddleware = createContactRouter(
        new CreateContact(contactRepository),
        new GetAllContacts(contactRepository),
        new UpdateContact(contactRepository),
        new DeleteContact(contactRepository)
    )
    server.use('/contact', contactMiddleware)
    /** ESTABLISHING HTTP CONNECTION */
    server.get('/', (req, res) => res.send('LOL CONGRATS'))
    server.listen(8080, () => Logger.log('info', 'Server running at localhost:8080'))
})()
