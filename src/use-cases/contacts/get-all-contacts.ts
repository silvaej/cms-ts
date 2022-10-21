import { ContactRepositoryIf } from '@src/interfaces/repositories/contact-repository'
import { GetAllContactsUseCase } from '@src/interfaces/use-cases/contacts'
import { ContactResponseModel } from '@src/models/contact'

export class GetAllContacts implements GetAllContactsUseCase {
    constructor(private repository: ContactRepositoryIf) {}
    async execute(owner: string, search?: string | undefined): Promise<Array<ContactResponseModel>> {
        const result = await this.repository.getContacts(owner, search)
        if (!result.acknowledged) throw new Error(result.error!)
        return result.data!
    }
}
