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

    // async getCreatorByUID(uid){
    //     const list = await db('creator').where('UserID', uid);
    //     return list[0];
    // },

    async getTestByID (testID) {
        const test = (await db('test').where('TestID',testID))[0];
        const listQuestionID = test.QuestionID;
        const listQuestion = [];
        const creator = (await db('creator').where('UserID', test.CreatedBy))[0];
        console.log(creator);
        for (const item of listQuestionID) {
            const question = (await db('question').where('ID', item))[0];
            var res = {};
            res.ID = question.ID;
            res.QuestionType = question.QuestionType;
            res.Score = question.Score;
            if (question.QuestionType == 'MultipleChoice') {
                const multipleQuestion = (await db('multiplechoice').where('QuestionID', question.ID))[0];
                res.Description = multipleQuestion.MCDescription;
                res.Answer = multipleQuestion.Answer;
                res.CorrectAnswer = multipleQuestion.CorrectAnswer;
            }
            else if (question.QuestionType == 'Code') {
                const codeQuestion = (await db('coding').where('QuestionID', question.ID))[0];
                res.Description = codeQuestion.CodeDescription;
                res.Language_allowed = codeQuestion.Language_allowed;
                res.RunningTime = codeQuestion.RunningTime;
                res.MemoryUsage = codeQuestion.MemoryUsage;
                res.TestCase = codeQuestion.TestCase;
            }
            listQuestion.push(res);
        }
        var result = {
            "generalInformation": test,
            "listQuestion": listQuestion,
            "creator": creator
        }
        return result;
    },
}