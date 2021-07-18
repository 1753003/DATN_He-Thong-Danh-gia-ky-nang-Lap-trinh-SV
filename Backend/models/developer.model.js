const db = require('../utils/db');

module.exports = {
    async get(id){
        return (await db('developer').where('UserID', id))[0];
    },
    async update(id, data) {
        await db('developer').where('UserID', id).update(data);
    },
    async getInviteList(uid) {
        return (await db.raw(`call getInviteTest ('${uid}')`))[0][0];
    },
}