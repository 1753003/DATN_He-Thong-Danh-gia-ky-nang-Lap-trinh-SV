const db = require('../utils/db');

module.exports = {
    async getPracticeSubmissions(id){
        return (await db.raw(`select s.*, p.PracticeName, p.DifficultLevel, p.Score as MaxScore, p.PracticeSet
        from submissions s inner join practice p on s.PracticeID = p.PracticeID
        where s.DevID = "${id}";`))[0];
    },

    async getTestSubmissions(id){
        return await db('submissions').join('test', 'submissions.TestID', '=', 'test.TestID').where({DevID: id, PracticeID : null});
    }
}