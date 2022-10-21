import {
    CreateContactUseCase,
    DeleteContactUseCase,
    GetAllContactsUseCase,
    UpdateContactUseCase,
} from '@src/interfaces/use-cases/contacts'
import express, { Request, Response } from 'express'
import { Logger } from '@src/utils/logger'
import { ContactResponseModel } from '@src/models/contact'
Logger.setLogger()

export function createContactRouter(
    createContact: CreateContactUseCase,
    getAll: GetAllContactsUseCase,
    updateContact: UpdateContactUseCase,
    deleteContact: DeleteContactUseCase
): express.Router {
    const router = express.Router()
    /** CREATE CONTACT ROUTE */
    router.post('/', async (req: Request, res: Response): Promise<void> => {
        try {
            await createContact.execute(req.body)
            Logger.log('info', 'Succesfully added contact to the database.')
            res.status(200).json({ message: 'New contact saved.' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ reason: err.message })
            }
        }
    })
    /** GET ALL CONTACTS ROUTE */
    router.get('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const { owner, search } = req.query
            if (!owner) {
                Logger.log('error', 'Owner query parameter not found')
                res.status(400).json({ error: 'Owner query parameter not found' })
                return
            }
            if (typeof owner === 'string' && (typeof search === 'string' || search === undefined)) {
                const result = await getAll.execute(owner, search)
                Logger.log('info', 'Contacts information retrieved')
                res.status(200).json({ data: result })
                return
            }
            Logger.log('error', 'Query paramaters must be in type string')
            res.status(400).json({ error: 'Query paramaters must be in type string' })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ reason: err.message })
            }
        }
    })
    /** UPDATE CONTACT ROUTE */
    router.put('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, contact } = req.body
            if (!id || typeof id !== 'string' || !contact || typeof contact !== 'object') {
                Logger.log('error', 'Body parameter/s missing or of the wrong type/s')
                res.status(400).json({ error: 'Body parameter/s missing or of the wrong type/s' })
                return
            }
            await updateContact.execute(id, contact)
            Logger.log('info', `Contact with an id of ${id} has been updated`)
            res.status(200).json({ message: `Contact with an id of ${id} has been updated` })
        } catch (err) {
            if (err instanceof Error) {
                Logger.log('error', err.message)
                res.status(500).json({ reason: err.message })
            }
        }
    })
    /** DELETE CONTACT ROUTE */
    router.delete('/', async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.query.id
            if (id && typeof id === 'string') {
                await deleteContact.execute(id)
                Logger.log('info', `Contact with an id of ${id} has been deleted`)
                res.status(200).json({ message: `Contact with an id of ${id} has been deleted` })
                return
            }
            Logger.log('error', 'Query parameter/s missing or of the wrong type/s')
            res.status(400).json({ error: 'Query parameter/s missing or of the wrong type/s' })
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
