import connection from "../database/database.js";
import { validateInputAndOutput } from "../validation/validation.js"

async function postOutput (req, resp) {
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

    if(error || !value || !description) {
        resp.status(400).send(error.details[0].message);
    }

    try {
        const result = await connection.query(`
            SELECT "userId" FROM sessions 
            WHERE token = $1
        ;`, [token]);

        if (!result.rowCount) {
            return resp.sendStatus(401);
        }

        const userId = result.rows[0].userId;

        await connection.query(`
            INSERT INTO registries 
            ("userId", description, value, register_type_id, date) 
            VALUES ($1, $2, $3, $4, NOW())    
        ;`, [userId, description, value, 2])
        resp.sendStatus(201);
    } catch (error) {
        resp.status(500).send(error.message);
    }
}

export default postOutput;