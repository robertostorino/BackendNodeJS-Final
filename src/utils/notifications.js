import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { logger } from '../config/logger.js';
import config from '../config/config.js';

const accountSID = config.ACCOUNT_SID;
const authToken = config.AUTH_TOKEN;

const service = config.SERVICE
const port = config.GMAIL_PORT
const mailUser = config.MAIL_USER
const mailPass = config.MAIL_PASS
const adminMail = config.ADMIN_MAIL

const twilioRegPhoneWhatsapp = config.TWILIO_REG_PHONE_WHATSAPP;
const adminPhoneWhatsapp = config.ADMIN_NUMBER_WHATSAPP

const twilioRegPhoneSms = config.TWILIO_REG_PHONE_SMS;
const adminNumberSms = config.ADMIN_NUMBER_SMS

const transporter = nodemailer.createTransport({
    service: service,
    port: port,
    auth: {
        user: mailUser,
        pass: mailPass
    },
    tls: {
        rejectUnauthorized: false
    }
});

console.log("NOTIFICATIONS")
console.log(accountSID)
console.log(authToken)
console.log(service)
console.log(port)
console.log(mailUser)
console.log(mailPass)
console.log(adminMail)
console.log(twilioRegPhoneWhatsapp)
console.log(adminPhoneWhatsapp)
console.log(twilioRegPhoneSms)
console.log(adminNumberSms)

export const adminNewUserNotification = async (newUser) => {

    let usuario = newUser.username;
    let nombre = newUser.name;
    let edad = newUser.age;
    let direccion = newUser.address;
    let telefono = newUser.telephone;

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Administrator" <${adminMail}>`,
        subject: 'Nuevo registro',
        text: ` Un nuevo usuario ha quedado registrado en nuestra base de datos con los siguientes datos:
        Usuario: ${usuario},
        Nombre: ${nombre},
        Edad: ${edad},
        Direccion: ${direccion},
        Telefono: ${telefono}.`,
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

export const adminNewOrderNotificationMail = async (user, newOrder) => {

    let usuario = user.username;
    let nombre = user.name;

    const buyedProducts = newOrder.map(producto => {
        return `<li>${producto.title} x${producto.qty} = $${producto.total_price} </li>`
    }).join(" ")

    const html = `<h1>Nuevo Pedido</h1>
    ${buyedProducts}`;

    const emailContent = {
        from: `My e-commerce NodeJS app <noreply@example.com>`,
        to: `"Administrator" <${adminMail}>`,
        subject: `Nuevo pedido de ${nombre}, ${usuario}`,
        html: html
    }

    try {
        let info = await transporter.sendMail(emailContent);
        logger.info('Message sent: %s', info.messageId);
        logger.info('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    } catch (error) {
        logger.error(error);
    }
}

export const userOrderNotificationSMS = async (userPhone) => {
    const client = twilio(accountSID, authToken);
    try {
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: twilioRegPhoneSms,
            to: `${userPhone}`
        })
    } catch (error) {
        logger.error(error)
    };
}

export const userOrderNotificationWhatsapp = async (userPhone) => {
    const client = twilio(accountSID, authToken);

    // al número de celular, le agrega un 9 en la tercera posición
    // para que sea compatible con Whatsapp en Argentina
    let userWhatsAppPhone = userPhone.slice(0, 3) + '9' + userPhone.slice(3);
    try {
        const message = await client.messages.create({
            body: 'Su pedido ha sido recibido y se encuentra en proceso',
            from: `whatsapp:${twilioRegPhoneWhatsapp}`,
            to: `whatsapp:${userWhatsAppPhone}`
        })
        logger.info(from, to)
    } catch (error) {
        logger.error(error)
    };
}
