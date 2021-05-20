const db = require("../utils/db");
const reportModel = require("../models/report.model");
const { getPracticeQuestionList } = require("./question.model");
const e = require("express");
module.exports = {
  async createTest(generalInformation, listQuestion) {
    await db("test")
      .insert(generalInformation)
      .then(async (TestID) => {
        var questionID = [];
        listQuestion.forEach(async (element) => {
          await db("question")
            .insert({
              TestID: TestID[0],
              QuestionType: element.QuestionType,
              Score: element.Score,
              PracticeID: null,
            })
            .then(async (result) => {
              questionID.push(result[0]);
              if (element.QuestionType === "MultipleChoice") {
                await db("multiplechoice").insert({
                  MCDescription: element.MCDescription,
                  Answer: JSON.stringify(element.Answer),
                  CorrectAnswer: JSON.stringify(element.CorrectAnswer),
                  QuestionID: result[0],
                });
              } else if (element.QuestionType === "Code") {
                await db("coding").insert({
                  CodeDescription: element.CodeDescription,
                  Language_allowed: generalInformation.LanguageAllowed,
                  RunningTime: element.RunningTime,
                  MemoryUsage: element.MemoryUsage,
                  TestCase: JSON.stringify(element.TestCase),
                  QuestionID: result[0],
                  CodeSample: element.CodeSample,
                });
              }
              await db("test")
                .update({
                  QuestionID: JSON.stringify(questionID),
                })
                .where("TestID", TestID[0]);
            });
        });
        await reportModel.createReport(generalInformation.TestName, TestID[0]);
      });
  },
  async getTestByUID(uid) {
    var res = await db("test").where("CreatedBy", uid);
    for (const item of res) {
      var num = await db.raw(
        `select count(*) as count from submissions where TestID = ${item.TestID}`
      );
      item.TotalDone = num[0][0].count;
    }
    return res;
  },

  async getTestByID(testID) {
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
    var result = {
      generalInformation: test,
      listQuestion: listQuestion,
    };
    return result;
  },

  async checkTest(testID, listTestAnswer) {
    const test = (await db("test").where("TestID", testID))[0];
    //console.log(test);
    const listQuestionID = test.QuestionID;
    var score = 0;
    for (const questionID of listQuestionID) {
      const question = (await db("question").where("ID", questionID))[0];
      if (question.QuestionType == "MultipleChoice") {
        const multipleQuestion = (
          await db("multiplechoice").where("QuestionID", question.ID)
        )[0];
        //console.log(multipleQuestion);
        for (const answer of listTestAnswer) {
          //console.log(answer);
          if (answer.ID == questionID) {
            if (
              JSON.stringify(answer.answer) ==
              JSON.stringify(multipleQuestion.CorrectAnswer)
            ) {
              score++;
            }
          }
        }
      } else if (question.QuestionType == "Code") {
        const codeQuestion = (
          await db("coding").where("QuestionID", question.ID)
        )[0];
        for (const answer of listTestAnswer) {
          if (answer.ID == questionID) {
            console.log(answer);
            // console.log(codeQuestion.RunningTime);
            // console.log(codeQuestion.MemoryUsage);
            if (
              answer.answer[0] <= codeQuestion.RunningTime &&
              JSON.stringify(answer.answer[1]) ==
                JSON.stringify(codeQuestion.MemoryUsage)
            ) {
              var tempArr = answer.answer.slice(2, answer.answer.length);
              //console.log(tempArr);
              //console.log(codeQuestion.TestCase);
              if (
                JSON.stringify(tempArr) ==
                JSON.stringify(codeQuestion.TestCase.Output)
              ) {
                //để lấy output thì chạy for để lấy testcase[0].output
                score++;
              }
            }
          }
        }
      }
    }
    return score;
  },

  async getTestList(set) {
    return await db("test").where("TestSet", set);
  },
  async getTestByCode(code) {
    return await db("test").where("TestCode", code);
  },
  async getTestBySet(set) {
    return await db("test")
      .where("LanguageAllowed", "like", `%${set}"%`)
      .where("Permissions", "public");
  },
  async updateTest(test, testID) {
    test.generalInformation.QuestionID = JSON.stringify(
      test.generalInformation.QuestionID
    );

    await db("test").where("TestID", testID).update(test.generalInformation);
    for (let question of test.listQuestion) {
      if (question.ID == undefined) {
        await db("question")
          .insert({
            QuestionType: question.QuestionType,
            Score: question.Score,
            TestID: testID,
          })
          .then(async (id) => {
            if (question.QuestionType == "MultipleChoice") {
              await db("multiplechoice").insert({
                MCDescription: question.MCDescription,
                Answer: JSON.stringify(question.Answer),
                CorrectAnswer: JSON.stringify(question.CorrectAnswer),
                QuestionID: id[0],
              });
            } else if (question.QuestionType == "Coding") {
              await db("coding").insert({
                CodeDescription: question.CodeDescription,
                Language_allowed: JSON.stringify(question.Language_allowed),
                RunningTime: question.RunningTime,
                MemoryUsage: question.MemoryUsage,
                TestCase: JSON.stringify(question.TestCase),
                QuestionID: id[0],
                CodeSample: question.CodeSample,
              });
            }
            const temp = (await db("test").where("TestID", testID))[0]
              .QuestionID;
            temp.push(id[0]);
            await db("test")
              .where("TestID", testID)
              .update({
                QuestionID: JSON.stringify(temp),
              });
          });
      } else {
        await db("question")
          .where("ID", question.ID)
          .update({ Score: question.Score });
        if (question.QuestionType == "MultipleChoice") {
          await db("multiplechoice")
            .where("QuestionID", question.ID)
            .update({
              MCDescription: question.MCDescription,
              Answer: JSON.stringify(question.Answer),
              CorrectAnswer: JSON.stringify(question.CorrectAnswer),
            });
        } else if (question.QuestionType == "Code") {
          await db("coding")
            .where("QuestionID", question.ID)
            .update({
              CodeDescription: question.CodeDescription,
              Language_allowed: JSON.stringify(question.Language_allowed),
              RunningTime: question.RunningTime,
              MemoryUsage: question.MemoryUsage,
              TestCase: JSON.stringify(question.TestCase),
              CodeSample: question.CodeSample,
            });
        }
      }
    }
  },
};
