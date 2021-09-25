/* authentication middleware using jwt tokens */

const jwt = require('jsonwebtoken');

export function verify(req, res, next) {

    try {
        /* JWT is sent with request header 
        Format is: Authorization : Bearer <token> */

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        req.userData = decodedToken;
        res.locals.userRole = decodedToken.user_role;
        next();
        
    } catch (error) {
        return res.status(401).send({
            message: 'Authentication failed'
        });
    }
}