import mongoose from "mongoose";
import { logger } from "../../config/logger.js";
import config from "../../config/config.js";
import dotenv from 'dotenv';

dotenv.config();

class MongoConnection {
    constructor() {
        if (!MongoConnection.instance) {
            const url = config.MONGOOSE_URL;
            mongoose.set("strictQuery", false);
            mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
            MongoConnection.instance = this;
        }
        return MongoConnection.instance;
    }

    async connect() {
        try {
            mongoose.connection.on('open', () => {
                logger.info('Connected to MongoDB')
            })
        } catch (error) {
            logger.error('Error connecting to MongoDB', error)
        }
    }

    async disconnect() {
        logger.info('Disconnecting MongoDB')
        mongoose.connection.close()
    }
}

export { MongoConnection };