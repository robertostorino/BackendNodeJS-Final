import * as dotenv from 'dotenv'
dotenv.config();

import config from './src/config/config.js';

import express from "express";
import { createServer } from 'http';
import handlebars from "express-handlebars";
import fileUpload from 'express-fileupload';

import cors from 'cors';

import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import { logger } from './src/config/logger.js';
import { clearCache } from './src/utils/clearCache.js';

import routerProducts from './src/routers/product.js';
import routerCarts from './src/routers/cart.js';
import routerOrders from './src/routers/order.js';
import routerLogin from './src/routers/login.js';
import routerLogout from './src/routers/logout.js';
import routerSignup from './src/routers/signup.js';
import routerProfile from './src/routers/profile.js';
import routerIndex from './src/routers/index.js';
import routerCartView from './src/routers/cartView.js';

import UsersController from './src/controllers/users.js';

const controllerUsers = new UsersController();

export function startServer(port){

    const app = express();
    const httpServer = createServer(app);

    app.use(express.json());
    app.use(fileUpload());

    if(config.NODE_ENV == 'development') app.use(cors());

    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use('/public/avatars/', express.static('./public/avatars'));

    const PORT = process.env.PORT || port;

    httpServer.listen(PORT, () => {
        logger.info(`Servidor escuchando en el puerto ${config.HOST}:${PORT} | Environment: ${config.NODE_ENV} | DB: ${config.TIPO_PERSISTENCIA}`)
    });
    httpServer.on("error", (error) => logger.warn("Error en servidor" + error));

    app.use(
        session({
            secret: config.SESSION_SECRET,
            saveUninitialized: false,
            resave: false,
            rolling: true,
            store: MongoStore.create({
                mongoUrl: config.MONGOOSE_URL,
                mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                ttl: 1 * (1000 * 60),
            }),
            cookie: {
                maxAge: 10 * (1000 * 60),
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(clearCache);

    const loginStrat = new LocalStrategy(controllerUsers.loginUser);
    const signupStrat = new LocalStrategy({ passReqToCallback: true }, controllerUsers.signupUser);
    
    passport.use('login', loginStrat);
    passport.use('signup', signupStrat);
    passport.serializeUser(controllerUsers.serializeUser);
    passport.deserializeUser(controllerUsers.deserializeUser);

    app.engine('handlebars', handlebars.engine());
    app.set('views', './src/views');
    app.set('view engine', 'handlebars');

    app
        .use("/", routerIndex)
        .use("/profile", routerProfile)
        .use("/cart", routerCartView)
        .use("/login", routerLogin)
        .use("/logout", routerLogout)
        .use("/signup", routerSignup)
        .use("/order", routerOrders)
        .use("/api/productos", routerProducts)
        .use("/api/carrito", routerCarts);

    app.all('*', function (req, res){
        const { url, method } = req
        let msg = `Route ${method} ${url} not implemented`;
        logger.warn(msg)
        return Error.notImplemented(req, res);
    });
};