import { DeleteResult, InsertOneResult, UpdateResult } from 'mongodb'

/** All return types defends on the mongodb driver */
export interface MongoDbWrapper {
    find(query: object): Promise<Array<any>>
    insertOne(doc: any): Promise<InsertOneResult>
    deleteOne(id: string): Promise<DeleteResult>
    updateOne(id: string, data: object): Promise<UpdateResult>
}
