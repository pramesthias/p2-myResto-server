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

    await queryInterface.bulkInsert('Cuisines', [
        {
            name: "Pizza",
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
        }
    ])

})

let cuisineId = 1;
let cuisine = {
    name: "Dumpling",
    description: "Dumpling",
    price: 30000,
    imgUrl: "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
    categoryId: 1
}

describe("/cuisines/:id", () => {

    //Berhasil mengupdate data Entitas Utama berdasarkan params id yang diberikan
    test("success update cuisine by id (200)", async () => {
        let {status, body} = await request(app)
            .put(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(cuisine);

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body.id).toBe(cuisineId);   
        expect(body).toHaveProperty("name", expect.any(String));   
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));   
        expect(body).toHaveProperty("imgUrl", expect.any(String)); 
        expect(body).toHaveProperty("categoryId", expect.any(Number));   
        expect(body).toHaveProperty("authorId", expect.any(Number));
        expect(body.authorId).toBe(admin.id); 
    })


    // Gagal menjalankan fitur karena belum login 
    test("failed update cuisine because not login yet (401)", async () => {
        let {status, body} = await request(app)
            .put(`/cuisines/${cuisineId}`)
            .send(cuisine);

            expect(status).toBe(401);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            expect(body.message).toContain("Unauthenticated");
    })    
    

    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed update cuisine with invalid token (401)", async () => {
        let {status, body} = await request(app)
            .put(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(cuisine);

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("invalid token");
    })


    // Gagal karena id entity yang dikirim tidak terdapat di database
    test("failed update cuisine with invalid id (404)", async () => {
        const invalidId = 7;
        let {status, body} = await request(app)
            .put(`/cuisines/${invalidId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(cuisine);

        expect(status).toBe(404);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("Data not found");
    })


    // Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya
    test("failed to update admin's cuisine by staff (403)", async () => {
        let {status, body} = await request(app)
            .put(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${tokenStf}`)
            .send(cuisine);

        expect(status).toBe(403);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        expect(body.message).toContain("You are not authorized");
    })


    //Gagal ketika request body yang diberikan tidak sesuai
    test("failed update cuisine with incomplete req body (400)", async () => {
        let {status, body} = await request(app)
            .put(`/cuisines/${cuisineId}`)
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send({
                name: "",
                description: "Dumpling",
                price: 30000,
                imgUrl: "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
                categoryId: 3,
                authorId: admin.id
            });

            expect(status).toBe(400);
            expect(body).toBeInstanceOf(Object);
            expect(body).toHaveProperty("message", expect.any(String));
            
            //COMMENT - UNCOMMENT
            expect(body.message).toContain("Name cannot be Empty!");   
            // expect(body.message).toContain("Description cannot be Empty!"); 
            // expect(body.message).toContain("Price cannot be Empty!"); 
            // expect(body.message).toContain("imgUrl cannot be Empty!"); 
            // expect(body.message).toContain("categoryId cannot be Empty!"); 
            // expect(body.message).toContain("authorId cannot be Empty!");
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