import { ContactRequestModel } from '@src/models/contact'

export interface UpdateContactUseCase {
    execute(id: string, contact: ContactRequestModel): Promise<void>
}
