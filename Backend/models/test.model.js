const db = require('../utils/db');
const reportModel = require('../models/report.model')
module.exports = {
    async createTest(generalInformation, listQuestion) {
        await db('test').insert(generalInformation).then(async TestID => {
            var questionID = [];
            listQuestion.forEach(async element => {
                await db('question').insert({
                    "TestID": TestID[0],
                    "QuestionType": element.QuestionType,
                    "Score": element.Score,
                    "PracticeID": null
                }).then(async result => {                     
                    questionID.push(result[0]);     
                    if (element.QuestionType === 'MultipleChoice') {         
                        await db('multiplechoice').insert({
                            "MCDescription": element.MCDescription,
                            "Answer": JSON.stringify(element.Answer),
                            "CorrectAnswer": JSON.stringify(CorrectAnswer),
                            "QuestionID": result[0],
                        })             
                    }
                    else if (element.QuestionType === 'Code') {
                        await db('coding').insert({
                            "CodeDescription": element.CodeDescription,
                            "Language_allowed": JSON.stringify(element.Language_allowed),
                            "RunningTime": element.RunningTime,
                            "MemoryUsage": element.MemoryUsage,
                            "TestCase": JSON.stringify(element.TestCase),
                            "QuestionID": result[0],
                            "SampleCode": element.SampleCode
                        })
                    }
                    await db('test').update({
                        "QuestionID": JSON.stringify(questionID)
                    })
                    .where('TestID', TestID[0])
                })               
            })     
            await reportModel.createReport(generalInformation.TestName, TestID[0]);               
        })
    },
    async getTestByUID(uid) {
        var res = await db('test').where('CreatedBy', uid)
        for (const item of res) {
            var num = await db.raw
                (`select count(*) as count from submissions where TestID = ${item.TestID}`)
            item.TotalDone = num[0][0].count;
        }
        return res;
    },

    async getTestByID (testID) {
        const test = (await db('test').where('TestID',testID))[0];
        const listQuestionID = test.QuestionID;
        const listQuestion = [];
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
            "listQuestion": listQuestion
        }
        return result;
    }
}