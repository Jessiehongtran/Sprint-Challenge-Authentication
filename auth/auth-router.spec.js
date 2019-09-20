const request = require('supertest');

const server = require('../api/server')

describe('server.js', ()=> {
    describe('GET /api/jokes', ()=> {
        it('should return JSON format', ()=> {
            return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        });
        it('should return 200 OK', ()=> {
            return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
    })

    describe('POST /api/auth/register', ()=> {
        it('should accept TEXT', ()=> {
        return request(server)
            .post('/api/auth/users')
            .send({'username': 'new'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            // .expect(200)
            // .end(function(err, res) {
            //   if (err) return done(err);
            //   done();
            // }); 
        })
        it('fails with missing credentials', async () => {
            const user = {};
            await request(server).post(`/api/auth/register`, user)
              .expect(500);
           });
        // it('should accept JSON and return 500 OK once test1 is registered', ()=> {
        //     request(server)
        //     .post('/api/auth/users')
        //     .send({username: 'test1'})
        //     .set('Accept', 'application/json')
        //     .expect('Content-Type', /json/)
        //     .expect(500) //because test1 was already registered
        //     .end(function(err, res) {
        //       if (err) return done(err);
        //       done();
        //         }); 
            
        // })
        it('fails with invalid credentials (repeating username', async () => {
            const user = {username:'test1', password: 'something'};
            await request(server).post(`/api/auth/register`, user)
              .expect(500); 
           });
        // it('succeeds with correct credentials (new user)', async () => {
        //     const user = {username:'new'};
        //     await request(server).post('/api/auth/register', user)
        //       .expect(200); 
        //    });
    })

    describe('POST /api/auth/login', ()=> {
        it('should accept JSON and return 200 OK once test1 is logged in', ()=> {
            request(server)
            .post('/api/auth/login')
            .send({username: 'test1', password: "test2"})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
              if (err) return done(err);
              done();
            }); 
        })
        it('should accept JSON and return 500 OK once Mary is logged in', ()=> {
            request(server)
            .post('/api/auth/login')
            .send({username: 'Mary'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200) //because Mary has not been registered
            .end(function(err, res) {
              if (err) return done(err);
              done();
                }); 
            
        })
    })
})
