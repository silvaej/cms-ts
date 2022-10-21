import { DataSource } from '@src/data/interfaces/user-data-source'
import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { DBResponse } from '@src/interfaces/responses/db-response'
import { ContactRequestModel, ContactResponseModel } from '@src/models/contact'

export class ContactRepository implements ContactRepositoryIf {
    constructor(private source: DataSource) {}

    async createContact(contact: ContactRequestModel): Promise<DBResponse<ContactResponseModel>> {
        return this.source.insertOne(contact)
    }

    async getContacts(owner: string, search?: string | undefined): Promise<DBResponse<Array<ContactResponseModel>>> {
        return this.source.find({ owner }, search)
    }

    async updateContact(id: string, contact: ContactRequestModel): Promise<DBResponse<ContactResponseModel>> {
        return this.source.findOneByIdAndUpdate(id, contact)
    }

    async deleteContact(id: string): Promise<DBResponse<ContactResponseModel>> {
        return this.source.findOneByIdAndDelete(id)
    }
}
