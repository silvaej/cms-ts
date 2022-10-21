import { ContactRequestModel } from '@src/models/contact'

export interface CreateContactUseCase {
    execute(contact: ContactRequestModel): Promise<void>
}
