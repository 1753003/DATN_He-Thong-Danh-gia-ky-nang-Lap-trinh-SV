const { getAll } = require('../../../../../Web2/wnc-final/backend/models/course.model');
const db = require('../utils/db');

module.exports = {
    async getAll(){
        return await db('test');
    },

    async getTestListInValid(){
        return await db('test').where('IsValid', 0);
    },

    async setValid(id){
        return await db('test').where('TestID', id).update('IsValid', 1);
    },

    async getByUID(uid) {
        const list = await db('userlogin').where('UserID', uid);
        return list[0];
    },
}