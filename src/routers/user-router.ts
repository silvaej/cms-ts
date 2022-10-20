import { LoginUseCase, SignupUseCase } from '@src/interfaces/use-cases/users'
import express, { Request, Response } from 'express'
import { Logger } from '@src/utils/logger'
Logger.setLogger()

export function createUserRouter(login: LoginUseCase, signup: SignupUseCase): express.Router {
    const router = express.Router()
    /** LOGIN ROUTE */
    router.get('/:username/:password', async (req: Request, res: Response): Promise<void> => {
        try {
            const { username, password } = req.params
            console.log(username)
            const result = await login.execute(username, password)
            Logger.log('info', `User ${result.name} with id ${result.id} is logged in successfuly.`)
            res.status(200).json(result)
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
            await signup.execute(req.body)
            Logger.log('info', 'Succesfully added user to the database.')
            res.status(200).json({ message: 'Successfuly signed up.' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ reason: err.message })
            }
        }
    })
    /* NOT ALLOWED METHODS */
    router.all('/', (req: Request, res: Response) => {
        res.status(501).end()
    })
    return router
}
