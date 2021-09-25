/** 
 * todo: user passwords should be stored and checked hashed, not plain text
*/
export async function login(req, res) {

    try {

        let login = await req.context.models.User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        let loginWithtoken = { ...login.toObject() };

        if (!login) {
            /* todo: instead of console logging, proper http response should be returned*/
            console.log("User doesn't exist.");
        }
        else {

            const jwt = require('jsonwebtoken');
            const token = jwt.sign({
                _id: login._id,
                username: req.body.username,
                password: req.body.password,
                user_role: login.user_role
            },
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });
            loginWithtoken = { ...loginWithtoken, "token": token }

        }
        return res.send(loginWithtoken);

    } catch (err) {
        return res.status(401).send({
            message: "Authentication failed."
        });
    }



}

export async function get(req, res) {
    const user = await req.context.models.User.findById(
        req.params.userId
    );
    return res.send(user);
}

export async function getAll(req, res) {
    const users = await req.context.models.User.find();
    return res.send(users);
}