const db = require('../utils/db');

module.exports = {
    async createCollection(newCollection) {
        await db('collection').insert(newCollection);
    },
    async getCollectionByUID(uid) {
        return await db('collection').where('CreatedBy', uid)   
    },
    async getTotalTest(collectionID){
        const num = await db.raw(`select count(*) as count from test where collectionID = ${collectionID}`);
        return num[0].count;
    }
}