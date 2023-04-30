import * as dotenv from 'dotenv';
import { startServer } from './app.js';
import { executeServerCluster } from './src/utils/excetuteClusterMode.js';
import { logger } from './src/config/logger.js';
import config from './src/config/config.js';

dotenv.config();

const port  = process.env.PORT || 8080;

switch (config.EXECUTION_MODE) {
    case "cluster":
        logger.info("Executing app in cluster mode");
        executeServerCluster(port)
        break;

    default:
        logger.info("Executing app in fork mode");
        startServer(port);
        break;
};