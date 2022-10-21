import { ContactRequestModel, ContactResponseModel, ContactUpdateRequest } from '@src/models/contact'
import { DBResponse } from '../responses/db-response'

export interface ContactRepositoryIf {
    createContact(contact: ContactRequestModel): Promise<DBResponse<ContactResponseModel>>
    getContacts(owner: string, search?: string): Promise<DBResponse<Array<ContactResponseModel>>>
    updateContact(id: string, contact: ContactUpdateRequest): Promise<DBResponse<ContactResponseModel>>
    deleteContact(id: string): Promise<DBResponse<ContactResponseModel>>
}
