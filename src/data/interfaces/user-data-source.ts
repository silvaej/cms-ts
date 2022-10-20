import { DBResponse } from '@src/interfaces/responses/db-response'
import { UserRequestModel, UserResponseModel } from '@src/models/user'

export interface DataSource {
    /** Find a specific record from the database using the id*/
    findOneById<T extends UserResponseModel>(id: string): Promise<DBResponse<T>>
    /** Find a specific record from the database using a query i.e {username} */
    findOneByUsername<T extends UserResponseModel>(username: string): Promise<DBResponse<T>>
    /** Find all record that satisfy the filter */
    find<T extends UserResponseModel>(query: object, search?: string): Promise<DBResponse<Array<T>>>
    /** Create an instance of an object and insert it to the database */
    insertOne<T extends UserResponseModel, U extends UserRequestModel>(doc: U): Promise<DBResponse<T>>
    /** Update a document using the id parameter */
    findOneByIdAndUpdate<T extends UserResponseModel, U extends UserRequestModel>(
        id: string,
        update: U
    ): Promise<DBResponse<T>>
    /** Delete an existing document using the id parameter */
    findOneByIdAndDelete<T extends UserResponseModel>(id: string): Promise<DBResponse<T>>
}
