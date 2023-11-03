const app = require('../app');
const request = require("supertest");
const { sequelize, User, Category } = require("../models");

const { queryInterface } = sequelize;

let user1 = {
    username: "admin",
    email: "admin@email.com",
    password: "12345",
    role: "Admin",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let user2 = {
    username: "staff",
    email: "staff2@how.com",
    password: "12345",
    phoneNumber: "087968012",
    address: "Gang Jambu"
}

let seed_category1 = { name: "Western Cuisine" };
let seed_category2 = { name: "Traditional Foods"};


beforeAll(async () => {

    admin = await User.create(user1); 
    staff = await User.create(user2); 

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
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        },
        {
            "name": "Pizza",
            "description": "Pizza is from Italy",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category1.id,
            "authorId": 1
        },
        {
            "name": "Soto",
            "description": "Soto is from Indonesia",
            "price": 50000,
            "imgUrl": "https://asset.kompas.com/crops/J-BSOZ4kJgmEYryOU3GqKlU23g4=/0x0:1000x667/750x500/data/photo/2020/08/01/5f24e8ed0cbc9.jpg",
            "createdAt": dateNow,
            "updatedAt": dateNow,
            "categoryId": category2.id,
            "authorId": 2
        }
    ])

})


describe("/pub/cuisines", () => {

    //Berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter
    test("success get all cuisines without query filter (200)", async () => {
        let {status, body} = await request(app)
            .get("/pub/cuisines")

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
        expect(body[0].User).toHaveProperty("username", expect.any(String));      
    
        expect(body[0]).toHaveProperty("Category");
        expect(body[0].Category).toHaveProperty("id", expect.any(Number));
        expect(body[0].Category).toHaveProperty("name", expect.any(String));
    })


    // Berhasil mendapatkan Entitas Utama dengan 1 query filter parameter
    test("success get all cuisines with filter query (200)", async () => {
        const categoryId = 1;
        let {status, body} = await request(app)
            .get(`/pub/cuisines?filter=${categoryId}`)

        expect(status).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body[0]).toBeInstanceOf(Object);
        expect(body[0]).toHaveProperty("id", expect.any(Number));  
        expect(body[0]).toHaveProperty("name", expect.any(String));   
        expect(body[0]).toHaveProperty("description", expect.any(String));
        expect(body[0]).toHaveProperty("price", expect.any(Number));   
        expect(body[0]).toHaveProperty("imgUrl", expect.any(String)); 
        expect(body[0]).toHaveProperty("categoryId", expect.any(Number)); 
        expect(body[0].categoryId).toBe(categoryId);   
        expect(body[0]).toHaveProperty("authorId", expect.any(Number));

        expect(body[0]).toHaveProperty("User");
        expect(body[0].User).toHaveProperty("username", expect.any(String));      
    
        expect(body[0]).toHaveProperty("Category");
        expect(body[0].Category).toHaveProperty("id", expect.any(Number));
        expect(body[0].Category).toHaveProperty("name", expect.any(String));
    })    
    

    // Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu (cek pagination-nya)
    test.only("succes get all cuisines with pagination (200)", async () => {
        let {status, body} = await request(app)
            .get(`/pub/cuisines?page=1`)

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
        expect(body[0].User).toHaveProperty("username", expect.any(String));      
    
        expect(body[0]).toHaveProperty("Category");
        expect(body[0].Category).toHaveProperty("id", expect.any(Number));
        expect(body[0].Category).toHaveProperty("name", expect.any(String));
    })
})


afterAll(async () => {
    await queryInterface.bulkDelete("Categories",null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })

    await queryInterface.bulkDelete("Cuisines",null, {
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