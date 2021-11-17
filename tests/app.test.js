import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

afterAll(async () => {
    await connection.query('DELETE FROM users;');
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    connection.end();
});

describe('POST/sing-up', () => {
    it('returns 400 invalid body, Empty body', async () => {
        const result = await supertest(app).post('/sign-up').send({});
        expect(result.status).toEqual(400);
    });

    it('returns 201 valid body, create user', async () => {
        const body = {
            name: 'Jennie Kim',
            email: 'nini@gmail.com',
            password: '12345678',
        };

        const resul = await supertest(app).post('/sign-up').send(body);
        expect(resul.status).toEqual(201);
    });

    it('returns 409 for email conflicts', async () => {
        const body = {
            name: 'Jennie Kim',
            email: 'nini@gmail.com',
            password: '12345678',
        };

        const resul = await supertest(app).post('/sign-up').send(body);
        expect(resul.status).toEqual(409);
    });
});
