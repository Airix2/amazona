import jwt from 'jsonwebtoken';

const signToken = (user)=> {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
}

export { signToken }