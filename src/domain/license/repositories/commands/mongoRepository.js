class MongoRepository {
    constructor(db) {
        this.db = db;
    }

    save = async (payload) => {
        try {
            const connection = await this.db.connect();
            const result = await connection.getCollection('license').updateOne(
                { "masterKey" : payload.masterKey },
                { $set: payload },
                { upsert: true }
             );
            return result.insertedId;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MongoRepository;
