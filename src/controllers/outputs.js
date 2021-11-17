import connection from '../database/database.js';
import { validateInputAndOutput } from '../validation/validation.js';

async function postOutput(req, resp) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return resp.sendStatus(401);
    }

    const {
        value,
        description,
    } = req.body;

    const { error } = validateInputAndOutput.validate({
        value,
        description,
    });

    if (error) {
        return resp.status(400).send(error.message);
    }

    try {
        const result = await connection.query(`
            SELECT user_id FROM sessions 
            WHERE token = $1
        ;`, [token]);

        if (!result.rowCount) {
            return resp.sendStatus(401);
        }

        const userId = result.rows[0].user_id;

        await connection.query(`
            INSERT INTO registries 
            (user_id, description, value, register_type_id, date) 
            VALUES ($1, $2, $3, $4, NOW())    
        ;`, [userId, description, value, 2]);

        resp.sendStatus(201);
    } catch (err) {
        resp.status(500).send(err.message);
    }
}

export default postOutput;
