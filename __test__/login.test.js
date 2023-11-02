const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

const user1 = {
    email: "admin@email.com",
    password: "12345" 
}

const user2 = { //NOT REGISTERED
    email: "staff2@how.com",
    password: "12345"
}

/*
Berhasil login dan diberikan access token
[ ] Email tidak diberikan / tidak diinput
[ ] Password tidak diberikan / tidak diinput
[ ] Email diberikan invalid / tidak terdaftar
[ ] Password diberikan salah / tidak match
Pastikan untuk testing ini sediakan dulu data Admin
*/


beforeAll(async () => {
    await User.create(user1); //registered
})

describe("/login", () => {


    //Berhasil login dan diberikan access token
    test("success login and get access token", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send(user1);

        console.log(status, body);
        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("access_token", expect.any(String));    //hard code
        expect(body).toHaveProperty("email", expect.any(String));   //"admin@email.com",
        expect(body).toHaveProperty("role", expect.any(String));
    })


    //Email tidak diberikan / tidak diinput
    test("failed login without email", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "",
                password: "12345678" 
            });  

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("error invalid email or password");
    })


    //Password tidak diberikan / tidak diinput
    test("failed login without password", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "admin@email.com",
                password: "" 
            });  

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("error invalid email or password");
    })


    // Email diberikan invalid / tidak terdaftar
    test("failed login with invalid email", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send(user2);   // not registered yet

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("user not found or password not matched");
    })
    
    
    // Password diberikan salah / tidak match
    test("failed login with invalid password", async () => {
        let {status, body} = await request(app)
            .post("/login")
            .send({
                email: "admin@email.com",
                password: "12345678" 
            });

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("user not found or password not matched");
    })




})

afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})