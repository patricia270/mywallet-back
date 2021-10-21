import connection from "../database/database.js";
import { validateInput } from "../validation/validation.js"

async function postInput (req, resp) {
    const authorization = req.headers['authorization'];
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        return resp.sendStatus(401);
    }

    const {
        value,
        description
    } = req.body;

    const error = validateInput.validate({
        value,
        description
    }).error;

    if(error) {
        console.log(error.message)
        resp.sendStatus(400);
    }

    try {
        await connection.query(`
            INSERT INTO inputs (value, description, input_date) VALUES ($1, $2, NOW())    
        ;`, [value, description])
        resp.sendStatus(201);
    } catch (error) {
        console.log(error);
        resp.sendStatus(500);
    }
}

export default postInput;