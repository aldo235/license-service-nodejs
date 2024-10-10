const { MongoClient } = require('mongodb');

class DatabaseMongodb {
    constructor(url) {
        this.client = null;
        this.db = null;
        this.url = url;
        this.pool = [];
    }

    connect = async () => {
        try {
            const uri = this.url;
            const poolExist = this.pool.find(pool => pool.name === uri);
            if (poolExist) {
                this.client = poolExist.client;
                this.db = this.client.db();
                return this;
            }
            this.client = new MongoClient(uri, {
                maxPoolSize: 10
            });
        
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db();
            this.pool.push({ name: uri, client: this.client });
            return this;
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
            throw error;
        }
      }
    
    getCollection = (name) => {
        return this.db.collection(name);
    }
    
    disconnect = async () => {
        if (this.client) {
            await this.client.close();
            console.log('Disconnected from MongoDB');
        }
    }
}

module.exports = DatabaseMongodb;