import { LoginUseCase, SignupUseCase } from '@src/interfaces/use-cases/users'
import express, { Request, Response } from 'express'
import { Logger } from '@src/utils/logger'
Logger.setLogger()

export function createUserRouter(login: LoginUseCase, signup: SignupUseCase): express.Router {
    const router = express.Router()
    /** LOGIN ROUTE */
    router.get('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.query
            if (typeof username == 'string' && typeof password == 'string') {
                const result = await login.execute(username, password)
                Logger.log('info', `User ${result.name} with id ${result.id} is logged in successfuly.`)
                res.status(200).json(result)
            } else res.status(400).json({ error: 'Missing query parameter/s' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                if (err.message == 'Wrong Password') res.status(401).json({ reason: "Passwords doesn't match." })
                else res.status(500).json({ reason: err.message })
            }
        }
    })
    /** SIGNUP ROUTE */
    router.post('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const { first, last, username, password } = req.body
            if ([first, last, username, password].every(params => params !== undefined && typeof params === 'string')) {
                await signup.execute(req.body)
                Logger.log('info', 'Succesfully added user to the database.')
                res.status(200).json({ message: 'Successfuly signed up.' })
            } else res.status(400).json({ reason: 'Missing body parameter/s' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ reason: err.message })
            }
        }
    })
    /* NOT ALLOWED METHODS */
    router.all('/', (req: Request, res: Response) => {
        Logger.log('warn', 'Request method not allowed/implemented.')
        res.status(501).end()
    })
    return router
}
