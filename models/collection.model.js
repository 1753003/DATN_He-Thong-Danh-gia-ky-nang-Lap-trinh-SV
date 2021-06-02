const db = require('../utils/db');

module.exports = {
    async createCollection(newCollection) {
        console.log(newCollection)
        await db('collection').insert(newCollection);
    },
    async getCollectionByUID(uid) {
        return await db('collection').where('CreatedBy', uid)   
    },
    async getTotalTest(collectionID){
        const num = await db.raw(`select count(*) as count from test where collectionID = ${collectionID}`);
        return num[0].count;
    },
    async addTest (testID, collectionID) {
        var testArr = (await db('collection').where('CollectionID',collectionID))[0].TestID;       
        testArr.push (testID);
        await db('collection').update('TestID',JSON.stringify(testArr));
    },
    async editCollection(collectionID, editCollection) {
        await db('collection').update(editCollection).where('CollectionID', collectionID);
    },
    async getCollectionByID(collectionID) {
        var list = ( await db('collection').where('CollectionID',collectionID))[0];
        list.Test = [];
        const listTest = list.TestID;
        for (const item of listTest) {
            const temp = (await db('test').where('TestID', item))[0];
            console.log(temp);
            list.Test.push(temp);
        }
        return list;
    },
    async removeTest(collectionID, testID) {
        var testList = (await db('collection').where('CollectionID', collectionID))[0].TestID;
        var index = 0;
        testList.forEach(item => {
            if (item == testID)
                testList.splice(index,1);
            index += 1;
        })
        await db('collection').where('CollectionID', collectionID).update({
            'TestID': JSON.stringify(testList)
        })
    },
    async remove(collectionID) {
        await db('collection').where('CollectionID', collectionID).del();
    }
}