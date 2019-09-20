const request = require('supertest');

const server = require('../api/server')

describe('server.js', ()=> {
    describe('GET /api/jokes', ()=> {
        it('should return 200 OK', ()=> {
            return request(server)
            .get('/api/jokes')
            .then(res => {
                expect(res.type).toMatch(/json/i)
            })
        })
    })
})