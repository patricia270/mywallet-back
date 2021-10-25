import supertest from "supertest";
import app from "../app"


describe ("POST/sing-up", () => {

    it("returns 400 invalid body, Empty body", async () => {    
        const result = await supertest(app).post("/sign-up").send({});
        expect(result.status).toEqual(400);
    });

    it("returns 201 valid body, create user", async () => {

        const body = {
            name: "Laura Silva",
            email: "laura@gmail.com",
            password: "12345678"
        }

        const resul = await supertest(app).post('/sign-up').send(body);       
        expect(resul.status).toEqual(201);
    })


    it("returns 409 for email conflicts", async () => {

        const body = {
            name: "Jennie Kim",
            email: "nini@gmail.com",
            password: "12345678"
        }

        const resul = await supertest(app).post('/sign-up').send(body);
        expect(resul.status).toEqual(409);
    });    
})
