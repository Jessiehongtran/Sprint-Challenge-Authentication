const db = require('../database/dbConfig')

module.exports = {
    addUser,
    // findUser
}

function addUser(user){
    return db('users')
            .insert(user, 'id')
            .then(ids => ({id: ids[0]}))
}

// function findUser(){

// }