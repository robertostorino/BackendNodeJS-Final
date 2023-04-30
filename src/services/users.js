import { UserRepository } from "../persistence/Repositories/usersRepository.js";

const persistence = new UserRepository();

export default class UsersService {
    constructor() {
        this.persistence = persistence
    }
    
    getUser = (user) => {
        return this.persistence.getUser(user)
    };

    loginUser = async (username, password, done) => {
        return this.persistence.loginUser(username, password, done)
    };
    
    signupUser = async (req, username, password, done) => {
        return await this.persistence.signupUser(req, username, password, done)
    };

    serializeUser = (username, done) => {
        return this.persistence.serializeUser(username, done)
    };

    deserializeUser = async (user, done) => {
        return this.persistence.deserializeUser(user, done)
    };
};