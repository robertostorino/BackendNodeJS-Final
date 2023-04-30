import dotenv from 'dotenv';
import path from 'path';

let mode = process.argv.slice(2)

if (mode == 'prod') {
    dotenv.config({
        path: path.resolve('./production.env')
    });
} else {
    dotenv.config({
        path: path.resolve('./development.env')
    });
}
dotenv.config({
    path: path.resolve('./.env')
});

export default {

    NODE_ENV : process.env.NODE_ENV || 'production',
    MONGOOSE_URL : process.env.MONGOOSE_URL,
    TIPO_PERSISTENCIA : process.env.TIPO_PERSISTENCIA || "MONGO_ATLAS",
    PORT: process.env.PORT || 8080,

    COOKIE : process.env.COOKIE,
    SESSION_SECRET : process.env.SESSION_SECRET,
    HOST : process.env.HOST || 'http://localhost',

    ADMIN : process.env.ADMIN || true,
    TIMEFORMAT: "DD-MM-YYYY HH:mm:ss",

    TTL : process.env.TTL,
    EXECUTION_MODE : process.env.EXECUTION_MODE || "fork",

    TWILIO_REG_PHONE_WHATSAPP : process.env.TWILIO_REG_PHONE_WHATSAPP,
    ADMIN_NUMBER_WHATSAPP : process.env.ADMIN_NUMBER_WHATSAPP,
    TWILIO_REG_PHONE_SMS : process.env.TWILIO_REG_PHONE_SMS,
    ADMIN_NUMBER_SMS : process.env.ADMIN_NUMBER_SMS,
    ACCOUNT_SID : process.env.ACCOUNT_SID,
    AUTH_TOKEN : process.env.AUTH_TOKEN,
    SERVICE : process.env.SERVICE,
    GMAIL_PORT : process.env.GMAIL_PORT,
    MAIL_USER : process.env.MAIL_USER,
    MAIL_PASS : process.env.MAIL_PASS,
    ADMIN_MAIL : process.env.ADMIN_MAIL
}