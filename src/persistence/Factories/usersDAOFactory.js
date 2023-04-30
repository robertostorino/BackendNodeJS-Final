import { DaoUser } from "../DAOs/userDaoMongoose.js";
import { modelUser } from "../models/userModel.js";
import { MongoConnection } from "../dbConnections/connectMongo.js";
import config from "../../config/config.js";

const option = config.TIPO_PERSISTENCIA;
const mongoConnection = new MongoConnection();

export class UsersDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO_ATLAS":
                mongoConnection.connect();
                DAO = new DaoUser(modelUser);
                break;
            case "MONGO_LOCAL":
                mongoConnection.connect();
                DAO = new DaoUser(modelUser);
                break;
            default:
                "MONGO_ATLAS";
                mongoConnection.connect();
                DAO = new DaoUser(modelUser);
        }
        return DAO
    }
};