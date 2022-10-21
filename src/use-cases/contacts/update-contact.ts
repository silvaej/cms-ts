import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { UpdateContactUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactRequestModel } from '@src/models/contact'
import { ContactValidator, validateId } from '@src/utils/validate'

export class UpdateContact implements UpdateContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}

    async execute(id: string, contact: ContactRequestModel): Promise<void> {
        validateId(id)
        ContactValidator.validate(contact)
        const result = await this.repository.updateContact(id, contact)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
