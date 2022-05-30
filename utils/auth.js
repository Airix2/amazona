import jwt from 'jsonwebtoken';

const signToken = (user)=> {
    return jwt.sign(
        { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    );
}

const isAuth = async (req, res, next) => {
    const  {authorization} = req.headers;
    let answer = 1;
    if (authorization) {
        const token = authorization.slice(7, authorization.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                answer = 'Token is not valid'
            } else {
                answer = 1;
                req.user = decode;
            }
        })
    } else {
        console.log('ye3')
        answer = 'Token is not supplied'
    }
    return answer
}

export { signToken, isAuth }