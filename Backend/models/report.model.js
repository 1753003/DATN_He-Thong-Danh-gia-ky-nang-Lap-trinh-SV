const e = require('express');
const db = require('../utils/db');
const testModel = require('./test.model');

module.exports = {
    async createReport(reportName, testID) {
       await db('report').insert({
           'ReportName': reportName,
           'TestID': testID
       })
    },
    async getList(uid) {
        const list = (await db.raw(`select report.* from report, test
                                where report.TestID = test.TestID and test.CreatedBy = "${uid}"`))[0];
        console.log(list);
        return list;
    },
    async getSummary(reportID) {
        var summary = (await db('report').where('ID', reportID))[0];
        const testID = summary.TestID;
        const numOfUser = (await db.raw(`select count(*) as numOfUsers
                                         from submissions
                                         where TestID = ${testID}
                                        `))[0][0].numOfUsers;
        const numOfQuestion = (await db.raw(`select count(*) as numOfQuestions
                                             from question
                                             where TestID = ${testID}`))[0][0].numOfQuestions;
        const time = (await db('test').where('TestID', testID))[0].TestTime;
        const listSubmission = (await db('submissions').where('TestID', testID));
        const listNotFinish = [];
        for (const item of listSubmission) {
            const userName = (await db.raw(`select UserName from userlogin, submissions
                                            where TestID = ${testID} and 
                                            userlogin.UserID = submissions.DevID`))[0][0].UserName;
            const numberNotFinish = numOfQuestion - item.AnsweredNumber;
            listNotFinish.push({
                userName: userName,
                number: numberNotFinish
            })
        }
        summary.numOfUser = numOfUser;
        summary.numOfQuestion = numOfQuestion;
        summary.time = time;
        summary.listNotFinish = listNotFinish;
        return summary;
    },

    async getUser(reportID) {
        const testID = (await db('report').where('ID', reportID))[0].TestID;
    
        const submission = (await db('submissions').where('TestID', testID));
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
        console.log(listQuestion);
        //console.log(listQuestion)
        var result = [];
        for (const item of submission) {
            var temp = {};
            var listQuestionUser = [];
            for ( const e of listQuestion) {
                var questionUser = {};
                questionUser.Question = e.Description;
                questionUser.Type = e.QuestionType;
                console.log(e.ID)
                if (questionUser.Type == 'Code') {
                    const answer = (await db('answercoding').where({
                        QuestionID: e.ID,
                        SubmissionID: item.SubmissionID                  
                    }))[0];
                    //console.log(answer);
                    if (answer != undefined) {
                    questionUser.Answered = answer.OutputTestcase;
                    questionUser.RunningTime = answer.RunningTime;}
                }
                else if (questionUser.Type == 'MultipleChoice') {
                    const answer = (await db('answermultiplechoice').where({
                        QuestionID: e.ID,
                        SubmissionID: item.SubmissionID                  
                    }))[0]; 
                    if (answer != undefined) {
                        questionUser.Answered = e.Answer[answer.Choice];
                        questionUser.RunningTime = "--"
                    }
                }
                listQuestionUser.push(questionUser);
            }
            
            const userName = (await db('userlogin').where('UserID', item.DevID))[0].UserName;
            temp = item;
            temp.userName = userName;
            temp.Unanswered = listQuestion.length - temp.AnsweredNumber;
            temp.ListQuestion = listQuestionUser;
            result.push(temp);
        }

        result.sort(function compare (a, b) {
            if (a.Score < b.Score)
                return 1
            if (a.Score > b.Score)
                return -1
            return 0
        })

        var rank = 1;
        for (i = 0; i < result.length; i++) {
            result[i].Rank = rank;
            if (i != result.length - 1)
                if (result[i].Score > result[i+1].Score)
                    rank += 1;
        }
        return result;
    }
}