const request = require('supertest')
const User= require('../src/models/user')
const app = require('../app')
const jwt = require('jsonwebtoken')

let  token = ''

test('should signup new user' , async ()=>{
    await request(app).post('/users').send({
            "name":"bosta",
            "age":"5",
            "password":"bosta1234",
            "email":"bosta@bosta.com"
        }).expect(200)

        const addedUser = await User.findOne({email:"bosta@bosta.com"}) ;

        token =  jwt.sign({"_id":addedUser._id.toString()} , 'Bosta-task')

})


test('should signin new user' , async ()=>{
    await request(app).post('/login').send({
            "password":"bosta1234",
            "email":"bosta@bosta.com"
        }).expect(200)
})

test('should create new check' , async ()=>{
    await request(app).post('/checks')
        .set('Authorization',`Bearer ${token}`)
        .send({
        "name":"checkGoogle",
        "url":"https://www.google.fr/?gws_rd=ssl",
        "protocol":"https"
    }).expect(200)
})


test('should create new check' , async ()=>{
    await request(app).post('/checks')
        .set('Authorization',`Bearer ${token}`)
        .send({
        "name":"checkGithub",
        "url":"https://www.github.com/",
        "protocol":"https"
    }).expect(200)
})

test('should create new check' , async ()=>{
    await request(app).post('/checks')
        .set('Authorization',`Bearer ${token}`)
        .send({
        "name":"checklinkedin",
        "url":"https://www.linkedin.com/",
        "protocol":"https"
    }).expect(200)
})

test('should run  check' , async ()=>{
    await request(app).post('/checks/Run/checkGoogle')
        .set('Authorization',`Bearer ${token}`)
        .send().expect(200)
})

test('should run  check' , async ()=>{
    await request(app).post('/checks/Run/checkGithub')
        .set('Authorization',`Bearer ${token}`)
        .send().expect(200)
})

test('should run  check' , async ()=>{
    await request(app).post('/checks/Run/checklinkedin')
        .set('Authorization',`Bearer ${token}`)
        .send().expect(200)
})

test('should edit  check' , async ()=>{
    await request(app).patch('/checks/checkGoogle')
        .set('Authorization',`Bearer ${token}`)
        .send({
            "name":"checkGoogleNewName",
            "url":"https://www.google.fr/?gws_rd=ssl",
            "protocol":"https"
        }).expect(200)
})

test('should delete  check' , async ()=>{
    await request(app).patch('/checks/checkGoogleNewName')
        .set('Authorization',`Bearer ${token}`)
        .send().expect(200)
})

test('should report check' , async ()=>{
    await request(app).get('/checks/checkGoogleNewName/report')
        .set('Authorization',`Bearer ${token}`)
        .send().expect(200)
})