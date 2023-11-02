const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;


/*
[x] Request Headers: { Authorization: "Bearer [your access token]" }
[x] Request body: { email, password }
[x] Response:
[x] 201: { id, email }
[x] 400: { errors }
*/
// const user1 = {
//     email: "adm@hoo.com",
//     password: "12345" 
// }

let seed_user1 = {
    username: "string",
    email: "admin@email.com",
    password: "12345",
    role: "Admin",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

const user2 = {
    email: "staff2@how.com",
    password: "12345"
}

let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let token;

beforeAll(async () => {
    let user1 = await User.create(seed_user1);
    token = signToken({id: user1.id})
})

describe("/add-users", () => {

    // Berhasil register
    test("success register new user", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send(user2);

        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("email", "staff2@how.com");
    })

    
    //Email tidak diberikan / tidak diinput
    test("failed register when email is null", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })

    
    //Password tidak diberikan / tidak diinput
    test("failed register when password is null", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "staff2@hoo.com",
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    

    //Email diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "",
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email cannot be Empty!");
    })


    //Password diberikan string kosong
    test("failed register when password is empty", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "staff2@hoo.com",
                password: ""
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Password cannot be Empty!");
    })
    
    
    //Email sudah terdaftar
    test("failed register with duplicate email (400)", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: seed_user1.email,
                password: seed_user1.password
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("email must be unique");
    })

    
    //Format Email salah / invalid
    test("failed register with invalid email format", async () => {
        let {status, body} = await request(app)
            .post("/add-users")
            .set("Authorization", `Bearer ${token}`)
            .send({
                email: "staff2hoocom",
                password: "12345"
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Email should be written in email format!");
    })


    //Gagal register staff karena admin belum login => "Unauthenticated" tidak ada token
    test("failed register when admin is not login", async () => {
        let {status, body} = await request(app) //headers
            .post("/add-users")
            .send(user2);   

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Unauthenticated");
    })
    
    
    //Gagal register staff karena token yang diberikan tidak valid (random string)  => "Unauthenticated"
    test("failed register when admin is not login", async () => {
        let {status, body} = await request(app) //headers
            .post("/add-users")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(user2);   //send headers dg token salah

        console.log(status, body);
        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("invalid token");
    })

})

afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})