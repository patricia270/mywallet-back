import connection from '../database/database.js';

async function signOut(req, resp) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if (!token) {
        return resp.sendStatus(401);
    }

    try {
        await connection.query(`
            DELETE FROM sessions
            WHERE token = $1
        ;`, [token]);
        resp.sendStatus(200);
    } catch (error) {
        resp.status(500).send(error.message);
    }
}

export default signOut;
