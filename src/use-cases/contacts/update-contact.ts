import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { UpdateContactUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactRequestModel, ContactUpdateRequest } from '@src/models/contact'
import { ContactValidator, validateId } from '@src/utils/validate'

export class UpdateContact implements UpdateContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}

    async execute(id: string, contact: ContactUpdateRequest): Promise<void> {
        validateId(id)
        // Quick Fix
        const toValidate: ContactRequestModel = { owner: '123412341234123412341234', ...contact }
        ContactValidator.validate(toValidate)
        const result = await this.repository.updateContact(id, contact)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
