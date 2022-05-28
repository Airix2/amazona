import bcrypt from 'bcryptjs/dist/bcrypt';
import { signToken } from '../../../utils/auth.js';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const db = require('../../../models/index.js');
const Users = db.users;

export default async function (req, res) {
    const { method, body, query } = req;

    switch (method) {
        case "GET":
            return;
        case "POST":
            try {
                let user = await Users.create({
                    name: body.name,
                    email: body.email,
                    password: bcrypt.hashSync(body.password),
                    isAdmin: 'false'
                });
                console.log(user)
                const token = signToken(user);
                res.send({
                    token,
                    id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin,
                })
            } catch (err) {
                console.log({ message: err.message })
                return res.status(400).json({ message: err.message });
            }
            return;
        default:
            return res.status(400).json({ message: "Method are not supported" });
    }
}