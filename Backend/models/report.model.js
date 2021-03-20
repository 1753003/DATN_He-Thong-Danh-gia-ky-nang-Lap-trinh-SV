const db = require('../utils/db');

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
                                            userlogin.UserID = submissions.DevID`))[0][0];
            const numberNotFinish = numOfQuestion - item.AnsweredNumber;
            listNotFinish.push({
                userName: userName,
                number: numberNotFinish
            })
        }
        summary.numOfUser = numOfUser;
        summary.numOfQuestion = numOfQuestion;
        summary.listNotFinish = listNotFinish;
        return summary;
    }
    
}