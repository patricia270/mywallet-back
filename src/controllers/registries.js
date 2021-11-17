import connection from '../database/database.js';

async function getRegistries(req, resp) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return resp.sendStatus(401);
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

        const registriesList = await connection.query(`
            SELECT registries.description, registries.value, 
                registries.date, types.register_type AS register_type 
            FROM registries
            JOIN types ON registries.register_type_id = types.id 
            WHERE user_id = $1 ORDER BY registries.id DESC
        ;`, [userId]);

        resp.send({
            registries: registriesList.rows,
        });
    } catch (error) {
        resp.status(500).send(error.message);
    }
}

export default getRegistries;
