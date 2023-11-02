const app = require('../app');
const request = require("supertest");
const { sequelize, User, Category } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let user1 = {
    username: "string",
    email: "admin@email.com",
    password: "12345",
    role: "Admin",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

// let user2 = {
//     username: "string",
//     email: "staff2@how.com",
//     password: "12345",
//     phoneNumber: "087968012",
//     address: "Gang Jambu"
// }

let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let token;
// let tokenStaff;

beforeAll(async () => {
    let admin = await User.create(user1);
    token = signToken({id: admin.id});
    
    // let staff = await User.create(user2);
    // tokenStaff = signToken({id: staff.id});
    
    const dateNow = new Date();

    await queryInterface.bulkInsert('Categories', [
        {
            "name": "Western Cuisine",
            "createdAt": dateNow,
            "updatedAt": dateNow,
        },
        {
            "name": "Traditional Foods",
            "createdAt": dateNow,
            "updatedAt": dateNow,
        },
    ])

})

describe("/categories", () => {

    //Berhasil mendapatkan data entitas kedua
    test("success get all categories (200)", async () => {
        let {status, body} = await request(app)
            .get("/categories")
            .set("Authorization", `Bearer ${token}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(Object);
        expect(body[0]).toHaveProperty("id", expect.any(Number));
        expect(body[0]).toHaveProperty("name", expect.any(String));
    })


    // Gagal menjalankan fitur karena belum login
    test("failed get all categories because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .get("/categories")

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed get all categories with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .get("/categories")
            .set("Authorization", `Bearer ${invalidToken}`)

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