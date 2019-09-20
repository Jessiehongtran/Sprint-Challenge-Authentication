const request = require('supertest');

const server = require('../api/server')

describe('server.js', ()=> {
    describe('GET /', ()=> {
        it('should return 200 OK', ()=> {
            return request(server)
            .get('/api/auth/users')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})