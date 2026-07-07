import jwt from 'jsonwebtoken';

const generateToken = (res, userID) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    res.cookies('jwt', token, {
        httpOnly: true,
        secure: process.env.Node_Env === "production" || !!process.env.CLIENT_URL,
        sameSite: (process.env.Node_ENV === "production"  || !!process.env.CLIENT_URL) ? 'none' : 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
}

export default generateToken;