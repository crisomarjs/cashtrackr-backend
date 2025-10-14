import { transport } from "../config/nodemailer"

type EmailType = {
    name: string
    email: string
    token: string
}

export class AuthEmail {
    static sendConfirmationEmail = async (user: EmailType) => {
        const email = await transport.sendMail({
            from: 'CashTrackr <admin@cashtrackr.com>',
            to: user.email,
            subject: 'CashTrackr - Confirma tu Cuenta',
            html: `
                <p>Hola: ${user.name}, has creado tu cuenta en CashTrackr, ya casi esta list </p>
                <p> Visita el siguiente enlace : </p>
                <a href="#">Confirmar Cuenta</a>
                <p> e ingresa el código <b>${user.token}</b> </p>
            `
        })

        console.log('Mensaje Enviado ', email.messageId)
    }
}