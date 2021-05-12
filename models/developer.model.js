const db = require('../utils/db');

module.exports = {
    async get(id){
        return (await db('developer').where('UserID', id))[0];
    }
}