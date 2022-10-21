import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { CreateContactUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactRequestModel } from '@src/models/contact'

// TODO Create a new file for this
function validatePhoneNumber(number: string): void {
    const regex = new RegExp(/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/)
    const valid = regex.test(number)
    if (!valid) throw new Error('Not a valid number')
}

function validate(contact: ContactRequestModel): void {
    if (!contact.home && !contact.mobile) throw new Error('Telephone or mobile number missing')
    if (contact.home) validatePhoneNumber(contact.home)
    if (contact.mobile) validatePhoneNumber(contact.mobile)
    if (!contact.billing && !contact.physical) throw new Error('Billing or physical address missing')
    // TODO Add more validation
}

export class CreateContact implements CreateContactUseCase {
    constructor(private repository: ContactRepositoryIf) {}
    async execute(contact: ContactRequestModel): Promise<void> {
        validate(contact)
        const result = await this.repository.createContact(contact)
        if (!result.acknowledged) throw new Error(result.error!)
    }
}
