const db = require('../utils/db');

module.exports = {
    async getPracticeSubmissions(id){
        return await db('submissions').where({DevID: id, TestID : null});
    },

    async getTestSubmissions(id){
        return await db('submissions').join('test', 'submissions.TestID', '=', 'test.TestID').where({DevID: id, PracticeID : null});
    }
}