const db = require('../database/dbConfig')

module.exports = {
    addUser,
    findUser,
    getUser
}

function addUser(user){
    return db('users')
            .insert(user, 'id')
            .then(ids => ({id: ids[0]}))
}

function findUser(filter){
    return db('users').where(filter)
}

function getUser(){
    return db('users')
}