import { ContactResponseModel } from '@src/models/contact'

export interface GetAllContactsUseCase {
    execute(owner: string, search?: string): Promise<Array<ContactResponseModel>>
}
