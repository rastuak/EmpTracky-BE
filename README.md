# Valencard-EIT24-BE
Backend system for wbdv yh's project *EmpTracky*

```javascript=
Employee     http://localhost:8000/employee
Users        http://localhost:8000/users
```


## Employee .../add

```json
// const response = await axios.post('http://localhost:8000/employee/add', { uuid, name, division, position, gender, birth, salary, contract, phone })
// request body example :
{
    uuid: "18",      // User ID
    name: "midoriya uzumaki",      // Employee name
    division: "electrical",  // Employee division
    position: "staff",  // Employee position
    gender: "Male",    // Employee gender
    birth: "2000-01-01",     // Employee birth date
    salary: 10000,    // Employee salary
    contract: "2027",  // Employee contract type
    phone: "6281234567890"      // Employee phone number
}

```

```json
// response.data :
{
    "id": 20,
    "user_id": "18",
    "name": "midoriya uzumaki",
    "division": "electrical",
    "position": "staff",
    "gender": "Male",
    "birth": "2000-01-01",
    "salary": 10000,
    "contract": "2027",
    "phone": "6281234567890"
}
```

## Employee .../get/:uuid [GET]
Get all employees related to user
```javascript
// const response = await axios.get(`http://localhost:8000/employee/get/${uuid}`)
//example :
const response = await axios.get('http://localhost:8000/employee/get/18')
```

```json
//Response.data :
[
    {
        "id": 20,
        "user_id": "18",
        "name": "midoriya uzumaki",
        "division": "electrical",
        "position": "staff",
        "gender": "Male",
        "birth": "2000-01-01",
        "salary": 10000,
        "contract": "2027",
        "phone": "6281234567890"
    },
    // other employees
]
```

## Employee .../:id [GET]
Gets one employee based on id
```javascript
// const response = await axios.get(`http://localhost:8000/employee/${employeeid}`);
// example :
const response = axios.get('http://localhost:8000/employee/20')
```

```json
//response.data :
{
    "id": 20,
    "user_id": "18",
    "name": "midoriya uzumaki",
    "division": "electrical",
    "position": "staff",
    "gender": "Male",
    "birth": "2000-01-01",
    "salary": 10000,
    "contract": "2027",
    "phone": "6281234567890"
}
```

## Employee  .../:id [PUT]
Edit an employee details
```javascript
// PUT http://localhost:8000/employee/:id
const response = await axios.put(`http://localhost:8000/employee/${id}`, {
        birth: "2000-02-02",
        division: "hardware",
        position: "director",
        salary: 5000000,
        contract: "2031"
      });
```
``` json
// response.data
{
    "id": 20,
    "user_id": "18",
    "name": "midoriya uzumaki",
    "division": "hardware",
    "position": "director",
    "gender": "Male",
    "birth": "2000-02-02",
    "salary": 5000000,
    "contract": "2031",
    "phone": "6281234567890"
}
```
## Employee .../:id [DELETE]
Delete an employee based on id
```javascript
// const response = await axios.delete(`http://localhost:8000/employee/${id}`)
// example :
const response = await axios.delete(`http://localhost:8000/employee/20`)
```

```json
//response.data :
{
    "message": "Employee deleted successfully"
}
```
## Users .../register [POST]
post user register details
```javascript
// example
const response = await axios.post('http://localhost:8000/users/register', {
        username, email, password
})
```
```json
//request body example
{
    username: "Admin",
    email: "admin@gmail.com",
    password: "Admin1234"
}
```
```json
// response.data :
{
    "id": 1,
    "username": "Admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$L/wLrf4KYtEUsAtHNl7bdemOn2bL3PLIyMZgkY9MBM6lUeU328UOe", //hashed password
}
```
## Users .../login [POST]
post user login details
```javascript
// example
const response = await axios.post('http://localhost:8000/users/login', {
        username, password
      })
```
```json
// response.data
{
    "id": 1,
    "username": "admin",
    "password": "$2b$10$L/wLrf4KYtEUsAtHNl7bdemOn2bL3PLIyMZgkY9MBM6lUeU328UOe"
}
```
#### response.status is 201, means login success
#### response.status is 300, means username not registered
#### response.status is 301, means wrong password

## Users .../:uuid [GET]
get user details based on uuid
```javascript
//const response = await axios.get(`http://localhost:8000/users/${uuid}`);
// example:
const response = await axios.get(`http://localhost:8000/users/1`);
```
```json
//response.data :
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$L/wLrf4KYtEUsAtHNl7bdemOn2bL3PLIyMZgkY9MBM6lUeU328UOe",
    "birth": "",
    "company": "",
    "division": "",
    "position": "",
    "gender": "",
    "phone": 
}
```

## Users .../:id [PUT]
edits user details
```javascript
// const response = await axios.put(`http://localhost:8000/users/${id}`
// example:
const response = await axios.put(`http://localhost:8000/users/1`), {
    birth: "2010-05-05",
    company: "pt priport",
    division: "Administration",
    position: "staff",
    gender: "Male",
    phone: "082127272726"
}
```
```json
//response.data :
{
    "id": 1,
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$L/wLrf4KYtEUsAtHNl7bdemOn2bL3PLIyMZgkY9MBM6lUeU328UOe",
    "birth": "2010-05-05",
    "company": "pt priport",
    "division": "Administration",
    "position": "staff",
    "gender": "Male",
    "phone": "082127272726"
}
```

## Extras
- run ``npm install`` to install depedencies
- enter rs on terminal if getting error