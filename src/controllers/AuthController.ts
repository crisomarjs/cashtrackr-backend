import type { Request, Response } from "express"
import User from "../models/User"
import { checkPassword, hashPassword } from "../utils/auth"
import { generateToken } from "../utils/token"
import { AuthEmail } from "../emails/AuthEmail"
import { generateJWT } from "../utils/jwt"

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        const { email, password } = req.body

        //prevenir correos duplicados
        const userExists = await User.findOne({ where: { email } })
        if (userExists) {
            const error = new Error('El usuario ya existe')
            res.status(409).json({ error: error.message })
        }

        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.token = generateToken()
            await user.save()

            await AuthEmail.sendConfirmationEmail({
                name: user.name,
                email: user.email,
                token: user.token
            })

            res.json('Cuenta Creada Correctamente')
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error' })
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        const { token } = req.body
        const user = await User.findOne({ where: { token } })

        if (!user) {
            const error = new Error('Token no válido')
            return res.status(401).json({ error: error.message })
        }

        user.confirmed = true
        user.token = null
        await user.save()

        res.json('Cuenta Confirmada Correctamente')
    }

    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body

        // Revisar que el usuario exista
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({ error: error.message })
        }

        if (!user.confirmed) {
            const error = new Error('La Cuenta no ha sido confirmada')
            return res.status(403).json({ error: error.message })
        }

        const isPasswordCorrect = await checkPassword(password, user.password)
        if (!isPasswordCorrect) {
            const error = new Error('Password Incorrecto')
            return res.status(401).json({ error: error.message })
        }

        const token = generateJWT(user.id)
        res.json(token)
    }

    static forgotPassword = async (req: Request, res: Response) => {
        const { email } = req.body

        // Revisar que el usuario exista
        const user = await User.findOne({ where: { email } })
        if (!user) {
            const error = new Error('Usuario no encontrado')
            return res.status(404).json({ error: error.message })
        }

        user.token = generateToken()
        await user.save()

        await AuthEmail.sendPasswordResetToken({
            name: user.name,
            email: user.email,
            token: user.token
        })

        res.json('Revisa tu email para instrucciones')
    }

    static validateToken = async (req: Request, res: Response) => {
        const {token} = req.body

        const tokenExists = await User.findOne({where: {token}})
        if(!tokenExists){
            const error = new Error('Token no válido')
            return res.status(404).json({error: error.message})
        }

        res.json('Token válido')
    }

    static resetPasswordWithToken = async (req: Request, res: Response) => {
        const {token} = req.params
        const {password} = req.body

        const user = await User.findOne({where: {token}})
        if(!user){
            const error = new Error('Token no válido')
            return res.status(404).json({error: error.message})
        }

        //asignar nuevo password
        user.password = await hashPassword(password)
        user.token = null
        await user.save()

        res.json('Password Actualizado Correctamente')
    }

    static user = async (req: Request, res: Response) => {
        res.json(req.user)
    }

}

