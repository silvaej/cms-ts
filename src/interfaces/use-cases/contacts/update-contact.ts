import { ContactUpdateRequest } from '@src/models/contact'

export interface UpdateContactUseCase {
    execute(id: string, contact: ContactUpdateRequest): Promise<void>
}
