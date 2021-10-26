import connection from "../database/database.js";
import { validateSignIn } from "../validation/validation.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

async function signIn (req, resp) {
    const {
        email,
        password
    } = req.body;

    const error = validateSignIn.validate({
        email,
        password
    }).error;

    if (error) {
        resp.status(400).send(error.message);
    }

    try {
        const result = await connection.query(`
            SELECT * FROM users 
            WHERE email = $1
        `, [email]);

        const user = result.rows[0];

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            
            await connection.query(`
              INSERT INTO sessions 
              ("userId", token)
              VALUES ($1, $2)
            `, [user.id, token]);

            resp.send({ 
                token,
                username: user.name
            });
            
        } else {
            resp.sendStatus(400)
        }
    }
    catch (error) {
        console.log(error)
        resp.sendStatus(500)
    }
}

export default signIn;
