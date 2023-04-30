import { DaoCart } from "../DAOs/cartDaoMongoose.js";
import { modelCarts } from "../models/cartModel.js";
import { DaoProduct } from "../DAOs/productDaoMongoose.js";
import { modelProducts } from "../models/productModel.js";
import { MongoConnection } from "../dbConnections/connectMongo.js";
import config from "../../config/config.js";

const option = config.TIPO_PERSISTENCIA;
const mongoConnection = new MongoConnection();

export class CartsDAOFactory {

    getDao() {
        let DAO;
        let daoProduct
        switch (option) {
            case "MONGO_ATLAS":
                mongoConnection.connect();
                daoProduct = new DaoProduct(modelProducts);
                DAO = new DaoCart(modelCarts, daoProduct);
                break;
            case "MONGO_LOCAL":
                mongoConnection.connect();
                daoProduct = new DaoProduct(modelProducts);
                DAO = new DaoCart(modelCarts, daoProduct);
                break;
            default:
                "MONGO_ATLAS";
                mongoConnection.connect();
                daoProduct = new DaoProduct(modelProducts);
                DAO = new DaoCart(modelCarts, daoProduct);
        }
        return DAO
    }
};