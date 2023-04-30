import { DaoProduct } from "../DAOs/productDaoMongoose.js";
import { modelProducts } from "../models/productModel.js";
import { MongoConnection } from "../dbConnections/connectMongo.js";
import config from "../../config/config.js";

const option = config.TIPO_PERSISTENCIA;
const mongoConnection = new MongoConnection(); 

export class ProductsDAOFactory {

    getDao() {
        let DAO;
        switch (option) {
            case "MONGO_ATLAS":
                mongoConnection.connect();
                DAO = new DaoProduct(modelProducts);
                break;
            case "MONGO_LOCAL":
                mongoConnection.connect();
                DAO = new DaoProduct(modelProducts);
                break;
            default:
                "MONGO_ATLAS"
                mongoConnection.connect();
                DAO = new DaoProduct(modelProducts);
        }
        return DAO
    }
};