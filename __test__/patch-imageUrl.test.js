const app = require('../app');
const request = require("supertest");
const { sequelize, User, Category } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;
const fs = require("fs");

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
            "name": "Dumpling",
            "description": "Dumpling is from China",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category.id,
            "authorId": staff.id
        }
    ])

})

let cuisineId = 1;

describe("/cuisines/:id/image-url", () => {

    //Berhasil mengupdate imgUrl Entitas Utama berdasarkan params id yang diberikan
    test("success patch imgUrl by id (200)", async () => {
        let {status, body} = await request(app)
            .patch(`/cuisines/${cuisineId}/image-url`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .attach('image', fs.readFileSync('./dumpling-isi-ayam.jpg'), 'dumpling-isi-ayam.jpg')

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        //expect(body.message).toContain(`Image Dumpling success to update`);
        },
        (20000)
    )


    // Gagal menjalankan fitur karena belum login 
    test("failed patch imgUrl because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .patch(`/cuisines/${cuisineId}/image-url`)
            .attach('image', fs.readFileSync('./dumpling-isi-ayam.jpg'), 'dumpling-isi-ayam.jpg');

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed patch imgUrl with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .patch(`/cuisines/${cuisineId}/image-url`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .attach('image', fs.readFileSync('./dumpling-isi-ayam.jpg'), 'dumpling-isi-ayam.jpg');

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("invalid token");
    })


    // Gagal karena id entity yang dikirim tidak terdapat di database
    test("failed patch imgUrl with invalid id (404)", async () => { //PASSED
        const invalidId = 7;
        let {status, body} = await request(app)
            .patch(`/cuisines/${invalidId}/image-url`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .attach('image', fs.readFileSync('./dumpling-isi-ayam.jpg'), 'dumpling-isi-ayam.jpg');

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Data not found");  
    })


    // Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
    test("failed to patch admin's imgUrl by staff (403)", async () => {
        let {status, body} = await request(app)
            .patch(`/cuisines/${cuisineId}/image-url`)
            .set("Authorization", `Bearer ${tokenStf}`)
            .attach('image', fs.readFileSync('./dumpling-isi-ayam.jpg'), 'dumpling-isi-ayam.jpg');

        expect(status).toBe(403);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("You are not authorized");
    })


    //Gagal ketika request body yang diberikan tidak sesuai
    test("failed patch imgUrl with incomplete req body (400)", async () => {
        let {status, body} = await request(app)
            .patch(`/cuisines/${cuisineId}/image-url`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .attach('image')

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("File is required!");   
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