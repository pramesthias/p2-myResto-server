const app = require('../app');
const request = require("supertest");
const { sequelize, User } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize;

const user1 = {
    
    username: "string",
    email: "admin@email.com",
    password: "12345",
    role: "Admin",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

const user2 = {
    username: "string",
    email: "staff@email.com",
    password: "12345",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC9.eyJpZCI6MSwiaWF0IjoxNjk4ODI1MDc0Q.A85Qn24V-jNwPqbc1VuFAuvgwPXFhcpVAClS0J78OS"
let admin;
let tokenAdm;
let cuisine

// let staff
// let tokenStf

beforeAll(async () => {
    admin = await User.create(user1);
    tokenAdm = signToken({id: admin.id});
    
    // let staff = await User.create(user2);
    // tokenStf = signToken({id: staff.id});

    cuisine = {
        name: "Dumpling",
        description: "Dumpling",
        price: 30000,
        imgUrl: "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
        categoryId: 3,
        authorId: admin.id
    }
})


describe("/cuisines", () => {

      //Berhasil membuat entitas utama
      test("success creating new cuisine", async () => {
        let {status, body} = await request(app)
            .post("/cuisines")
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send(cuisine);

        expect(status).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("id", expect.any(Number));    
        expect(body).toHaveProperty("name", expect.any(String));   
        expect(body).toHaveProperty("description", expect.any(String));
        expect(body).toHaveProperty("price", expect.any(Number));   
        expect(body).toHaveProperty("imgUrl", expect.any(String)); 
        expect(body).toHaveProperty("categoryId", expect.any(Number));   
        expect(body).toHaveProperty("authorId", expect.any(Number));
    })
    
    //Gagal menjalankan fitur karena belum login
    test("failed because not login yet", async () => {
        let {status, body} = await request(app)
            .post("/cuisines")
            .send(cuisine);

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));    
        expect(body.message).toContain("Unauthenticated");    
    })

        
    // Gagal menjalankan fitur karena token yang diberikan tidak valid
    test("failed because invalid token", async () => {
        let {status, body} = await request(app)
            .post("/cuisines")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(cuisine);

        expect(status).toBe(401);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));    
        expect(body.message).toContain("invalid token");    
    })


    // Gagal ketika request body tidak sesuai (validation required)
    test.only("failed because incomplete req body", async () => {
        let {status, body} = await request(app)
            .post("/cuisines")
            .set("Authorization", `Bearer ${tokenAdm}`)
            .send({
                name: "Dumpling",
                // description: "Dumpling",
                price: 30000,
                imgUrl: "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
                categoryId: 3,
                authorId: admin.id
            });

        expect(status).toBe(400);
        expect(body).toBeInstanceOf(Object);
        expect(body).toHaveProperty("message", expect.any(String));
        
        //COMMENT - UNCOMMENT
        // expect(body.message).toContain("Name cannot be Empty!");   
        expect(body.message).toContain("Description cannot be Empty!"); 
        // expect(body.message).toContain("Price cannot be Empty!"); 
        // expect(body.message).toContain("imgUrl cannot be Empty!"); 
        // expect(body.message).toContain("categoryId cannot be Empty!"); 
        // expect(body.message).toContain("authorId cannot be Empty!"); 
    })

})


afterAll(async () => {
    await queryInterface.bulkDelete("Users",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})
