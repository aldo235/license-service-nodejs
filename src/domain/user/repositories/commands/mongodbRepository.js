const User = require('../../models/User');

class MongodbCommandRepository {
    constructor(db) {
        this.db = db;
    }

    save = async (user) => {
        const connection = await this.db.connect();
        const res = await connection.getCollection('users').insertOne(user);
        return new User(res.insertedId.toString(), user.email, user.hashedPassword);
    }

}

module.exports = MongodbCommandRepository;
