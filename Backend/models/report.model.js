const e = require("express");
const db = require("../utils/db");
const testModel = require("./test.model");

module.exports = {
  async createReport(reportName, testID) {
    await db("report").insert({
      ReportName: reportName,
      TestID: testID,
    });
  },
  async getList(uid) {
    const list = (
      await db.raw(`select report.* from report, test
                                where report.TestID = test.TestID and test.CreatedBy = "${uid}"`)
    )[0];
    console.log(list);
    return list;
  },
  async getSummary(reportID) {
    var summary = (await db("report").where("ID", reportID))[0];
    const testID = summary.TestID;
    const numOfUser = (
      await db.raw(`select count(*) as numOfUsers
                                         from submissions
                                         where TestID = ${testID}
                                        `)
    )[0][0].numOfUsers;
    console.log(testID);
    const numOfQuestion = (
      await db.raw(`select QuestionID
                                             from test
                                             where TestID = ${testID}`)
    )[0][0].QuestionID.length;
    const time = (await db("test").where("TestID", testID))[0].TestTime;
    const listSubmission = await db("submissions").where("TestID", testID);
    const listNotFinish = [];
    for (const item of listSubmission) {
      const userName = (
        await db.raw(`select UserName from userlogin, submissions
                                            where submissions.TestID = ${testID} and 
                                            userlogin.UserID = submissions.DevID`)
      )[0][0].UserName;
      const numberNotFinish = numOfQuestion - item.AnsweredNumber;
      listNotFinish.push({
        userName: userName,
        number: numberNotFinish,
      });
    }
    summary.numOfUser = numOfUser;
    summary.numOfQuestion = numOfQuestion;
    summary.time = time;
    summary.listNotFinish = listNotFinish;
    return summary;
  },
  async getUser(reportID) {
    var result = (
      await db.raw(`select submissions.*, userlogin.UserName
                    from submissions, report, userlogin
                    where submissions.TestID = report.TestID 
                    and report.ID = ${reportID} 
                    and userlogin.UserID = submissions.DevID
                    order by Score DESC`)
    )[0];

    var rank = 1;
    for (i = 0; i < result.length; i++) {
      result[i].Rank = rank;
      if (i != result.length - 1)
        if (result[i].Score > result[i + 1].Score) rank += 1;
    }
    return result;
  },
  async getUserDetail(reportID, userName) {
    const testID = (
      await db.raw(`select test.*
    from test, report
    where test.TestID = report.TestID and report.ID = ${reportID}`)
    )[0][0].TestID;
    
    const a = (await db.raw(`call getUserDetailReport(${testID}, '${userName}', 'MC')`))[0][0];
    const b = (await db.raw(`call getUserDetailReport(${testID}, '${userName}', 'Code')`))[0][0];
    
    for (let e of b) {
      for (let i of e.StudentOutput) {
        i = Buffer.from(i, 'base64').toString();
      }
      e.StudentCodeScript = Buffer.from(e.StudentCodeScript, 'base64').toString();    
    }

    return a.concat(b);
  },
  async getQuestion(testID) {
    console.log("TestID: ", testID);
    const templist = (await db("test").where("TestID", testID))[0].QuestionID;
    let result = [];
    const submission = await db("submissions").where("TestID", testID);
    const list = [];
    for (const i of templist) {
      list.push((await db("question").where("ID", i))[0]);
    }
    for (item of list) {
      let NumberUserAnswer = [];
      let ListUser = [];
      if (item.QuestionType == "MultipleChoice") {
        const question = (
          await db("multiplechoice").where("QuestionID", item.ID)
        )[0];
        item.Question = question.MCDescription;
        item.Answer = question.Answer;
        item.CorrectAnswer = question.CorrectAnswer;

        for (let i = 0; i < item.Answer.length; i++) NumberUserAnswer[i] = 0;

        for (const e of submission) {
          let Answered = [];
          console.log(item.ID, e.SubmissionID);
          const answer = (
            await db("answermultiplechoice").where({
              QuestionID: item.ID,
              SubmissionID: e.SubmissionID,
            })
          )[0];
          for (a of answer.Choice) {
            NumberUserAnswer[a]++;
            Answered.push(item.Answer[a]);
          }

          const user = (await db("userlogin").where("UserID", e.DevID))[0]
            .UserName;
          ListUser.push({
            User: user,
            Answered: Answered,
          });
        }
        item.NumberUserAnswer = NumberUserAnswer;
      } else {
        console.log(item.ID, e.SubmissionID);
        const question = (await db("coding").where("QuestionID", item.ID))[0];
        item.Question = {
          Question: question.CodeDescription,
          CodeSample: question.CodeSample,
        };

        item.Answer = {
          TestCase: question.TestCase,
          MemoryUsage: question.MemoryUsage,
          RunningTime: question.RunningTime,
        };

        let tcPassNumber = [];
        for (let tc of question.TestCase) {
          tcPassNumber.push(0);
        }
        for (const e of submission) {
          const answer = (
            await db("answercoding").where({
              QuestionID: item.ID,
              SubmissionID: e.SubmissionID,
            })
          )[0];

          const user = (await db("userlogin").where("UserID", e.DevID))[0]
            .UserName;

          for (let tc of answer.TestCasePassed) {
            tcPassNumber[tc]++;
          }

          ListUser.push({
            TestCasePassed: answer.TestCasePassed,
            DescriptionCode: answer.DescriptionCode,
            RunningTime: answer.RunningTime,
            MemoryUsage: answer.MemoryUsage,
            User: user,
          });
        }
        item.NumberUserAnswer = tcPassNumber;
      }
      result.push({
        ID: item.ID,
        Question: item.Question,
        Type: item.QuestionType,
        Correct: item.NumberPeopleRight,
        Answer: item.Answer,
        CorrectAnswer: item.CorrectAnswer,
        NumberUserAnswer: item.NumberUserAnswer,
        ListUser: ListUser,
      });
    }
    return result;
  },
  async updateReport(testID, percentPass, percentSuccess) {
    await db("report").where("TestID", testID).update({
      PercentSuccess: percentSuccess,
      PercentPass: percentPass,
    });
  },
  async compareCoding(reportID, username) {
    const list = (await db.raw(`select answercoding.DescriptionCode
                                      ,userlogin.UserName
                  from answercoding, report, submissions, userlogin
                  where userlogin.UserID = submissions.DevID
                  and report.ID = ${reportID}
                  and report.TestID = submissions.TestID
                  and answercoding.SubmissionID = submissions.SubmissionID`))[0];
    let temp = {};
    let count = 0;
    let index = 0;
    list.forEach(e => {
      e.DescriptionCode = Buffer.from(e.DescriptionCode, 'base64').toString();
      
      if (e.UserName == username) {
        temp = e;
        index = count;
      }
      count++;
    })
    list.splice(index, 1)
    console.log(temp)
    var similarity = require('string-cosine-similarity')
    
    list.forEach(e => {
      try {
      e.SimilarityPercent = similarity(temp.DescriptionCode, e.DescriptionCode)
      }
      catch(error) {
        console.log(error)
        console.log(e)
      }
    })
    
    return list;
  }
};
