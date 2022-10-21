import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { UpdateContactUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactRequestModel } from '@src/models/contact'

export class UpdateContact implements UpdateContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}

    async execute(id: string, contact: ContactRequestModel): Promise<void> {
        // TODO validate input
        const result = await this.repository.updateContact(id, contact)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}