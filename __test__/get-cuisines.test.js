const app = require('../app');
const request = require("supertest");
const { sequelize, User, Category } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

let seed_user1 = {
    username: "string",
    email: "admin@email.com",
    password: "12345",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let seed_user2 = {
    username: "string",
    email: "staff2@how.com",
    password: "12345",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let seed_category1 = { name: "Western Cuisine" };
let seed_category2 = { name: "Traditional Foods"};


let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let token;

beforeAll(async () => {
    let user1 = await User.create(seed_user1); //registered
    let user2 = await User.create(seed_user2); //registered
    token = signToken({id: user1.id})

    let category1 = await Category.create(seed_category1); //registered
    let category2 = await Category.create(seed_category2); //registered

    const dateNow = new Date();

    await queryInterface.bulkInsert('Cuisines', [
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": user1.id
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": user2.id
        },
    ])

})

describe("/cuisines", () => {

    //[ ] Berhasil mendapatkan data Entitas Utama
    test("success get all cuisines (200)", async () => {
        let {status, body} = await request(app)
            .get("/cuisines")
            .set("Authorization", `Bearer ${token}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(Object);
        expect(body[0]).toHaveProperty("id", expect.any(Number));    
        expect(body[0]).toHaveProperty("name", expect.any(String));   
        expect(body[0]).toHaveProperty("description", expect.any(String));
        expect(body[0]).toHaveProperty("price", expect.any(Number));   
        expect(body[0]).toHaveProperty("imgUrl", expect.any(String)); 
        expect(body[0]).toHaveProperty("categoryId", expect.any(Number));   
        expect(body[0]).toHaveProperty("authorId", expect.any(Number));

        expect(body[0]).toHaveProperty("User");
        expect(body[0].User).toHaveProperty("id", expect.any(Number));
        expect(body[0].User).toHaveProperty("username", expect.any(String));   
        expect(body[0].User).toHaveProperty("email", expect.any(String));
        expect(body[0].User).toHaveProperty("role", expect.any(String));   
        expect(body[0].User).toHaveProperty("phoneNumber", expect.any(String)); 
        expect(body[0].User).toHaveProperty("address", expect.any(String)); 
    
        expect(body[0]).toHaveProperty("Category");
        expect(body[0].Category).toHaveProperty("id", expect.any(Number));
        expect(body[0].Category).toHaveProperty("name", expect.any(String));
    })


    // Gagal menjalankan fitur karena belum login 
    test("failed get all cuisines because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .get("/cuisines")

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("invalid token");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed get all cuisines with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .get("/cuisines")
            .set("Authorization", `Bearer ${invalidToken}`)

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