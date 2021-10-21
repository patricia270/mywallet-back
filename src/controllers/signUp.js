import connection from '../database/database.js';
import bcrypt from 'bcrypt';
import { validateSignUp } from '../validation/validation.js';

async function signUp (req, resp) {
    const {
        name,
        email,
        password
    } = req.body;

    const error = validateSignUp.validate({
        name,
        email,
        password
    }).error;

    if (error) {
        resp.sendStatus(400);
    }

    try {
        const result = await connection.query(`
            SELECT email FROM users 
            WHERE email = $1
        ;`, [email]);

        if (result.rows.length) {
            return resp.sendStatus(409);
        }
        const passwordHash = bcrypt.hashSync(password, 10);
        await connection.query(`
            INSERT INTO users 
            (name, email, password) 
            VALUES ($1, $2, $3);
        `, [name, email, passwordHash]);
        resp.sendStatus(201);
    }
    catch (error) {
        console.log(error)
        resp.sendStatus(500)
    }
};

export default signUp;