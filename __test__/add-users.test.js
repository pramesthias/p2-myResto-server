const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;


/*
[x] Request Headers: { Authorization: "Bearer [your access token]" }
[x] Request body: { email, password }
[x] Response:
[x] 201: { id, email }
[x] 400: { errors }
*/

const user1 = {
    email: "adm@hoo.com",
    password: "12345" 
}

const user2 = {
    email: "staff2@how.com",
    password: "12345"
}

beforeAll(async () => {
    await User.create(user1);
})

describe("/add-users", () => {

    test("success register new user", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send(user2);

        console.log(status, body);
        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "staff2@hoo.com");
    })

    
    //Email tidak diberikan / tidak diinput
    test("failed register when email is null", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send({
                password: "12345"
            });

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })

    
    //Password tidak diberikan / tidak diinput
    test("failed register when password is null", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send({
                email: "staff2@hoo.com",
            });

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    

    //Email diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send({
                email: "",
                password: "12345"
            });

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })


    //Password diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send({
                email: "staff2@hoo.com",
                password: ""
            });

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    
    
    //Email sudah terdaftar
    test.only("failed register with duplicate email (400)", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send(user1);

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("email must be unique");
    })

    
    //Format Email salah / invalid
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .send({
                email: "staff2hoocom", //email format
                password: "12345"
            });

        console.log(status, body);
        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email should be written in email format!");
    })


    //Gagal register staff karena admin belum login => "Unauthenticated" tidak ada token
    test("failed register when admin is not login", async () => {
        let {status, body} = await request(app) //headers
            .post("/add-users")
            .send(user1);   //send headers kosong -- sudah di create

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Unauthenticated");
    })
    
    
    //Gagal register staff karena token yang diberikan tidak valid (random string)  => "Unauthenticated"
    test("failed register when admin is not login", async () => {
        let {status, body} = await request(app) //headers
            .post("/add-users")
            .send(user1);   //send headers dg token salah

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Unauthenticated");
    })

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})