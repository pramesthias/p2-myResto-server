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
// let seed_category2 = { name: "Traditional Foods"};

let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let tokenAdm;
let admin; 
let tokenStf;
let staff;

beforeAll(async () => {
    admin = await User.create(user1); 
    staff = await User.create(user2); 
    tokenAdm = signToken({id: admin.id});
    tokenStf = signToken({id: staff.id});

    let category = await Category.create(seed_category); 
    // let category2 = await Category.create(seed_category2); 

    const dateNow = new Date();

    await queryInterface.bulkInsert('Cuisines', [   // insert pake date
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
        {
            "name": "Sushi",
            "description": "Sushi is from Japan",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category.id,
            "authorId": admin.id
        }
    ])

})

let cuisineId = 1;

describe("/cuisines/:id", () => {

    //Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan
    test("success delete one cuisine by id (200)", async () => {
        let {status, body} = await request(app)
            .delete(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Pizza success to delete");
    })


    // Gagal menjalankan fitur karena belum login 
    test("failed delete cuisine because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .delete(`/cuisines/${cuisineId}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed delete cuisine with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .delete(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("invalid token");
    })


    // Gagal karena id entity yang dikirim tidak terdapat di database
    test("failed delete cuisine with invalid id (401)", async () => {
        const invalidId = 7;
        let {status, body} = await request(app)
            .delete(`/cuisines/${invalidId}`)
            .set("Authorization", `Bearer ${invalidToken}`)

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("invalid token");
    })


    // Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya
    test("failed to delete admin's cuisine by staff (403)", async () => {
        cuisineId = 3;
        let {status, body} = await request(app)
            .delete(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${tokenStf}`)

            expect(status).toBe(403);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("You are not authorized");
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