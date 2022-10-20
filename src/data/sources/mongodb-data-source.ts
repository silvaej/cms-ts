import { DBResponse } from '@src/interfaces/responses/db-response'
import { UserRequestModel, UserResponseModel } from '@src/models/user'
import { MongoDbWrapper } from '../interfaces/mongodb-wrapper'
import { DataSource } from '../interfaces/user-data-source'
import { Logger } from '@src/utils/logger'
Logger.setLogger()

export class MongoDbDataSource implements DataSource {
    constructor(private db: MongoDbWrapper) {}

    async findOneById<T extends UserResponseModel>(id: string): Promise<DBResponse<T>> {
        const result = await this.db.find({ _id: id })
        const { _id, ...data } = result[0]
        let acknowledged = false
        if (!result.length) {
            return {
                acknowledged,
                data: { id: _id, ...data },
                error: null,
            }
        }
        return {
            acknowledged,
            data: null,
            error: 'Not found',
        }
    }

    async findOneByUsername<T extends UserResponseModel>(username: string): Promise<DBResponse<T>> {
        const result = await this.db.find({ username })
        if (result.length) {
            const { _id, ...data } = result[0]
            return {
                acknowledged: true,
                data: { id: _id, ...data },
                error: null,
            }
        }

        return {
            acknowledged: false,
            data: null,
            error: 'Not found',
        }
    }

    async find<T extends UserResponseModel>(query: object, search?: string | undefined): Promise<DBResponse<Array<T>>> {
        const queryString = search ? { ...query, $text: { $search: search } } : query
        const results = await this.db.find(queryString)
        if (!results.length)
            return {
                acknowledged: true,
                data: results.map(item => {
                    const { _id, ...other } = item
                    return { id: _id, ...other }
                }),
                error: null,
            }
        return {
            acknowledged: false,
            data: null,
            error: 'No result',
        }
    }

    async insertOne<T extends UserResponseModel, U extends UserRequestModel>(doc: U): Promise<DBResponse<T>> {
        const { acknowledged } = await this.db.insertOne(doc)
        return {
            acknowledged,
            data: null,
            error: acknowledged ? null : 'Something went wrong',
        }
    }

    async findOneByIdAndUpdate<T extends UserResponseModel, U extends UserRequestModel>(
        id: string,
        update: U
    ): Promise<DBResponse<T>> {
        const { acknowledged, matchedCount } = await this.db.updateOne(id, update)
        let response: DBResponse<T> = {
            acknowledged: false,
            data: null,
            error: null,
        }
        if (!acknowledged) response.error = 'Something went wrong'
        if (matchedCount === 0) response.error = 'Not found'
        response.acknowledged = true

        return response
    }

    async findOneByIdAndDelete<T extends UserResponseModel>(id: string): Promise<DBResponse<T>> {
        const { acknowledged } = await this.db.deleteOne(id)
        return {
            acknowledged,
            data: null,
            error: acknowledged ? null : 'Not found',
        }
    }
}
