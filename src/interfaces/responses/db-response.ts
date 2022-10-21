import { ContactResponseModel } from '@src/models/contact'
import { LoginResponseModel, UserResponseModel } from '@src/models/user'

export interface DBResponse<
    T extends UserResponseModel | ContactResponseModel | Array<UserResponseModel> | Array<ContactResponseModel>
> {
    acknowledged: boolean
    data: T | null
    error: string | null
}
