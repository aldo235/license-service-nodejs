class MongoRepository {
    constructor(db) {
        this.db = db;
    }

    findByMasterKey = async (masterKey) => {
        try {
            const connection = await this.db.connect();
            const result = await connection.getCollection('license').findOne({ masterKey});
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = MongoRepository;
