import connection from "../database/database.js";
import { validateInputAndOutput } from "../validation/validation.js"

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

    const error = validateInputAndOutput.validate({
        value,
        description
    }).error;

    if(error) {
        console.log(error.message)
        resp.sendStatus(400);
    }

    try {
        const result = await connection.query(`
            SELECT "userId" FROM sessions 
            WHERE token = $1
        ;`, [token]);

        const userId = result.rows[0].userId;
   
        await connection.query(`
            INSERT INTO registries 
            ("userId", description, value, register_type_id, date)
            VALUES ($1, $2, $3, $4, NOW())    
        ;`, [userId, description, value, 1])
        resp.sendStatus(201);
    } catch (error) {
        console.log(error);
        resp.sendStatus(500);
    }
}

export default postInput;