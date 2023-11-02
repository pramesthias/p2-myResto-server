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

let user2 = {
    username: "string",
    email: "staff2@how.com",
    password: "12345",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let seed_category = { name: "Western Cuisine" };

beforeAll(async () => {
    admin = await User.create(user1); 
    staff = await User.create(user2); 

    let category = await Category.create(seed_category); 

    const dateNow = new Date();

    await queryInterface.bulkInsert('Cuisines', [
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category.id,
            "authorId": admin.id
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category.id,
            "authorId": staff.id
        },
    ])

})


const cuisineId = 2;

describe("/pub/cuisines/:id", () => {

    //Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan
    test("success get one cuisine by id (200)", async () => {
        let {status, body} = await request(app)
            .get(`/pub/cuisines/${cuisineId}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id");
        expect(body.id).toBe(cuisineId);    
        expect(body).toHaveProperty("name", expect.any(String));   
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));   
        expect(body).toHaveProperty("imgUrl", expect.any(String)); 
        expect(body).toHaveProperty("categoryId", expect.any(Number));   
        expect(body).toHaveProperty("authorId", expect.any(Number));
    })


    // Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid
    test("failed get cuisine with invalid id (404)", async () => {
        const invalidId = 7;
        let {status, body} = await request(app)
            .get(`/pub/cuisines/${invalidId}`)

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Cuisine not found");
    })
})



afterAll(async () => {
    await queryInterface.bulkDelete("Cuisines",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Categories",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})