const db = require('../utils/db');

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
                            "CorrectAnswer": element.CorrectAnswer,
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
                            "QuestionID": result[0]
                        })
                    }
                    await db('test').update({
                        "QuestionID": JSON.stringify(questionID)
                    })
                    .where('TestID', TestID[0])
                })               
            })                    
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
    }
}