import { Db, DeleteResult, Document, InsertOneResult, MongoClient, ObjectId, UpdateResult } from 'mongodb'
import { MongoDbWrapper } from '../interfaces/mongodb-wrapper'
import { Logger } from '@src/utils/logger'
Logger.setLogger()

export class MongoDB implements MongoDbWrapper {
    constructor(private db: Db, private collection: string) {
        if (collection === 'contacts') db.createIndex(collection, { '$**': 'text' })
    }

    async find(query: object): Promise<Array<any>> {
        return await this.db.collection(this.collection).find(query).toArray()
    }

    async insertOne(doc: any): Promise<InsertOneResult<Document>> {
        return await this.db.collection(this.collection).insertOne(doc)
    }

    async deleteOne(id: string): Promise<DeleteResult> {
        return await this.db.collection(this.collection).deleteOne({ _id: new ObjectId(id) })
    }

    async updateOne(id: string, data: object): Promise<UpdateResult> {
        return await this.db.collection(this.collection).updateOne({ _id: new ObjectId(id) }, data)
    }
}

export async function getDbConnection(): Promise<Db> {
    const client: MongoClient = new MongoClient(process.env.MONGODB_URI)
    Logger.log('info', 'Connecting to the MongoDB Client. Please wait...')
    await client.connect()
    Logger.log('info', 'Connected to MongoDB Client.')
    const db = client.db('CMS_TS')
    return db
}
