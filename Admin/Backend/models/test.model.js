const db = require('../utils/db');

module.exports = {
    async getTestListInValid(set){
        return await db('test').where('IsValid', 0);
    },
}