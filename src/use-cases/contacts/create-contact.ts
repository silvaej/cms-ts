import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { CreateContactUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactRequestModel } from '@src/models/contact'
import { ContactValidator } from '@src/utils/validate'

export class CreateContact implements CreateContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}
    async execute(contact: ContactRequestModel): Promise<void> {
        ContactValidator.validate(contact)
        const result = await this.repository.createContact(contact)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
