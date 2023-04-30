import { UsersDAOFactory } from "../Factories/usersDAOFactory.js";

const factory = new UsersDAOFactory();

export class UserRepository {
    DAO

    constructor() {
        this.DAO = factory.getDao()
    }

    getUser = async (username) => {
        return await this.DAO.getUser(username)
    };

    loginUser = async (username, password, done) => {
        return await this.DAO.loginUser(username, password, done)
    };
    
    signupUser = async (req, username, password, done) => {
        return await this.DAO.signupUser(req, username, password, done)
    };

    serializeUser = (username, done) => {
        return this.DAO.serializeUser(username, done)
    };

    deserializeUser = async (user, done) => {
        return this.DAO.deserializeUser(user, done)
    };
};