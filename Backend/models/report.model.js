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
    const numOfQuestion = (
      await db.raw(`select count(*) as numOfQuestions
                                             from question
                                             where TestID = ${testID}`)
    )[0][0].numOfQuestions;
    const time = (await db("test").where("TestID", testID))[0].TestTime;
    const listSubmission = await db("submissions").where("TestID", testID);
    const listNotFinish = [];
    for (const item of listSubmission) {
      const userName = (
        await db.raw(`select UserName from userlogin, submissions
                                            where TestID = ${testID} and 
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
    const testID = (await db("report").where("ID", reportID))[0].TestID;

    const submission = await db("submissions").where("TestID", testID);
    const test = (await db("test").where("TestID", testID))[0];
    const listQuestionID = test.QuestionID;
    const listQuestion = [];
    for (const item of listQuestionID) {
      const question = (await db("question").where("ID", item))[0];
      var res = {};
      res.ID = question.ID;
      res.QuestionType = question.QuestionType;
      res.Score = question.Score;
      if (question.QuestionType == "MultipleChoice") {
        const multipleQuestion = (
          await db("multiplechoice").where("QuestionID", question.ID)
        )[0];
        res.Description = multipleQuestion.MCDescription;
        res.Answer = multipleQuestion.Answer;
        res.CorrectAnswer = multipleQuestion.CorrectAnswer;
      } else if (question.QuestionType == "Code") {
        const codeQuestion = (
          await db("coding").where("QuestionID", question.ID)
        )[0];
        res.Description = codeQuestion.CodeDescription;
        res.Language_allowed = codeQuestion.Language_allowed;
        res.RunningTime = codeQuestion.RunningTime;
        res.MemoryUsage = codeQuestion.MemoryUsage;
        res.TestCase = codeQuestion.TestCase;
      }
      listQuestion.push(res);
    }
    //console.log(listQuestion);
    //console.log(listQuestion)
    var result = [];
    for (const item of submission) {
      var temp = {};
      var listQuestionUser = [];
      for (const e of listQuestion) {
        var questionUser = {};
        questionUser.Question = e.Description;
        questionUser.Type = e.QuestionType;
        console.log(e);
        if (questionUser.Type == "Code") {
          const answer = (
            await db("answercoding").where({
              QuestionID: e.ID,
              SubmissionID: item.SubmissionID,
            })
          )[0];
          //console.log(answer);
          if (answer != undefined) {
            questionUser.Answered = answer.OutputTestcase;
            questionUser.RunningTime = answer.RunningTime;
          }
        } else if (questionUser.Type == "MultipleChoice") {
          const answer = (
            await db("answermultiplechoice").where({
              QuestionID: e.ID,
              SubmissionID: item.SubmissionID,
            })
          )[0];
          if (answer != undefined) {
            questionUser.Answered = [];
            for (let choice of answer.Choice)
              questionUser.Answered.push(e.Answer[choice]);

            questionUser.RunningTime = "--";
          }
        }
        listQuestionUser.push(questionUser);
      }

      const userName = (await db("userlogin").where("UserID", item.DevID))[0]
        .UserName;
      temp = item;
      temp.userName = userName;
      temp.Unanswered = listQuestion.length - temp.AnsweredNumber;
      temp.ListQuestion = listQuestionUser;
      result.push(temp);
    }

    result.sort(function compare(a, b) {
      if (a.Score < b.Score) return 1;
      if (a.Score > b.Score) return -1;
      return 0;
    });

    var rank = 1;
    for (i = 0; i < result.length; i++) {
      result[i].Rank = rank;
      if (i != result.length - 1)
        if (result[i].Score > result[i + 1].Score) rank += 1;
    }
    return result;
  },
  async getQuestion(testID) {
    console.log("TestID: ", testID);
    const list = await db("question").where("TestID", testID);
    let result = [];
    const submission = await db("submissions").where("TestID", testID);

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

          const user = (await db('userlogin').where('UserID', e.DevID))[0].UserName;
          ListUser.push({
            User: user,
            Answered: Answered,
          });
        }
        item.NumberUserAnswer= NumberUserAnswer;
      } else {
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
            tcPassNumber.push(0)
        }
        for (const e of submission) {
          const answer = (
            await db("answercoding").where({
              QuestionID: item.ID,
              SubmissionID: e.SubmissionID,
            })
          )[0];

          const user = (await db('userlogin').where('UserID', e.DevID))[0].UserName;
          
          for (let tc of answer.TestCasePassed) {
              tcPassNumber[tc]++
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
    await db('report').where('TestID', testID).update({
      PercentSuccess: percentSuccess,
      PercentPass: percentPass
    })
  }
};
