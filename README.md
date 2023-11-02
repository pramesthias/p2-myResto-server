[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12633455&assignment_repo_type=AssignmentRepo)
# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini

# My First Server App
My First Server App is an application developed for assignment purposes. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

## Cuisines Public

### GET /pub/cuisines

> Get all cuisines for public site

_Request Header_
```
not needed
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": integer,
        "name": "string",
        "description": "string",
        "price": integer,
        "imgUrl": "string",
        "categoryId": integer,
        "authorId": integer,
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "id": integer,
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "Category": {
            "id": integer,
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    },
    ...
]
```
---
### GET /pub/cuisines/:id

> Get one cuisine by id for public site

_Request Header_
```
not needed
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": integer,
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
    "authorId": integer,
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Cuisine not found"
}
```

---

## Users

### POST /add-users

> Register new user

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "username": "string",
    "email": "string",
    "password": "string",
    "phoneNumber": "string",
    "address": "string"
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "email": "string"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Email cannot be Empty!"
        OR
    "message": "Email should be written in email format!"
        OR
    "message": "Password cannot be Empty!"
        OR
    "message": "Minimum password length is 5"
}
```
---
### POST /login

> User login

_Request Header_
```
not needed
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "email": "string",
    "password": "string"
}
```

_Response (200 - OK)_
```
{
    "access_token": "string"
    "email": "string",
    "role": "string"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "error invalid email or password"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "user not found or password not matched"
}
```
---

## Categories
### GET /categories

> Get all categories

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": integer,
        "name": "string",
        "createdAt": "date",
        "updatedAt": "date"
    },
    ...
]
```
---
### POST /categories

> Create new categories

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "name": "string"
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name cannot be Empty!"
}
```
---
### PUT /categories/:id

> Edit category by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "name": "string"
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "name": "string",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name cannot be Empty!"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found"
}
```
---

## Cuisines

### GET /cuisines

> Get all cuisines

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "id": integer,
        "name": "string",
        "description": "string",
        "price": integer,
        "imgUrl": "string",
        "categoryId": integer,
        "authorId": integer,
        "createdAt": "date",
        "updatedAt": "date",
        "User": {
            "id": integer,
            "username": "string",
            "email": "string",
            "role": "string",
            "phoneNumber": "string",
            "address": "string",
            "createdAt": "date",
            "updatedAt": "date"
        },
        "Category": {
            "id": integer,
            "name": "string",
            "createdAt": "date",
            "updatedAt": "date"
        }
    },
    ...
]
```
---
### GET /cuisines/:id

> Get one cuisine by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "id": integer,
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
    "authorId": integer,
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Cuisine not found"
}
```
---
### POST /cuisines

> Create new cuisines

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
not needed
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
    "authorId": integer
}
```

_Response (201 - Created)_
```
{
    "id": integer,
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name cannot be Empty!"
        OR
    "message": "Description cannot be Empty!"
        OR
    "message": "Price cannot be Empty!"
        OR
    "message": "imgUrl cannot be Empty!"
        OR
    "message": "categoryId cannot be Empty!"
        OR
    "message": "authorId cannot be Empty!"
}
```
---
### PUT /cuisines/:id

> Edit cuisine by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
}
```

_Response (201 - Created)_
```
{
    "name": "string",
    "description": "string",
    "price": integer,
    "imgUrl": "string",
    "categoryId": integer,
    "authorId": integer
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Name cannot be Empty!"
        OR
    "message": "Description cannot be Empty!"
        OR
    "message": "Price cannot be Empty!"
        OR
    "message": "imgUrl cannot be Empty!"
        OR
    "message": "categoryId cannot be Empty!"
        OR
    "message": "authorId cannot be Empty!"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found"
}
```
---
### DELETE /cuisines/:id

> Delete cuisine by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
    "message": "<entity name> success to delete"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found"
}
```
---
### PATCH /cuisines/:id/image-url

> Edit imageUrl of Cuisine by id

_Request Header_
```
{"Authorization": "Bearer <your access token>"}
```

_URL Params_
```
id: integer [required]
```

_Data Params_
```
not needed
```

_Request Body_
```
{
    "image": "string"
}
```

_Response (200 - OK)_
```
{
    "message": "Image <entity name> by staff success to update"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "File is required"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Data not found"
}
```

---
### Global Error

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthenticated"
}
```

_Response (403 - Forbidden)_
```
{
    "message": "You are not authorized"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```