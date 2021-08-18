const db = require("../utils/db");
const reportModel = require("../models/report.model");

const { getPracticeQuestionList } = require("./question.model");

module.exports = {
  async createTest(generalInformation, listQuestion, listEmail, result, uid) {
    console.log(generalInformation)
    await db("test")
      .insert(generalInformation)
      .then(async (TestID) => {
        var questionID = [];
        var oldQuestionID = (await db("userlogin").where("UserID", uid))[0]
          .QuestionID;
        for (const element of listQuestion) {
          if (element.ID == undefined || element.ID == "undefined") {
            await db("question")
              .insert({
                TestID: TestID[0],
                QuestionType: element.QuestionType,
                Score: element.Score,
                PracticeID: null,
                Method: element.Method
              })
              .then(async (result) => {
                questionID.push(result[0]);
                oldQuestionID.push(result[0]);
                if (element.QuestionType === "MultipleChoice") {
                  await db("multiplechoice").insert({
                    MCDescription: element.MCDescription,
                    Answer: JSON.stringify(element.Answer),
                    CorrectAnswer: JSON.stringify(element.CorrectAnswer),
                    QuestionID: result[0],
                    MCCoding: element.CodeSample,
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
              });
          } else {
            questionID.push(element.ID);
          }
        }
        await db("test")
          .update({
            QuestionID: JSON.stringify(questionID),
          })
          .where("TestID", TestID[0]);
        
        await db("userlogin")
          .update({ QuestionID: JSON.stringify(oldQuestionID) })
          .where("UserID", uid);
        await reportModel.createReport(generalInformation.TestName, TestID[0]);
        await db.raw(
          `call updatePermission('${JSON.stringify(listEmail)}', ${TestID})`
        );
        var nodemailer = require("nodemailer");
        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "group7.17clc@gmail.com",
            pass: "group7.17clc",
          },
        });
        var CryptoJS = require("crypto-js");

        // Encrypt
        console.log(TestID[0].toString());
        var ciphertext = CryptoJS.AES.encrypt(
          TestID[0].toString(),
          "secret key 12345"
        ).toString();
        var mailOptions;
        for (const e of listEmail) {
          mailOptions = {
            from: "group7.17clc@gmail.com",
            to: e,
            subject: "[no-reply] New invite",
            html: `<h2>You have a new invitation to access a test</h2> 
    <p>Here are your code to access it: <b>${result}</b> </p>
    <p>You can access quickly by the link below:</p>
    <p>codejoyfe.me/developer/test/questions?key=Avx&x=${ciphertext}</p>
    <hr/>
    <p>Best,</p>
    <p>CodeJoy Team</p>`,
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        }
      });
  },

  async getTestByUID(uid) {
    var res = await db("test").where("CreatedBy", uid);
    return res;
  },

  async getTestGeneralInformation(testID, type, uid) {
    let check = true;
    var result;
    console.log("TYPE:", type);
    if (type == "developer") {
      const test = (await db("test").where("TestID", testID))[0];
      if (test.Permissions == "private") {
        console.log(uid);
        const testIDArray = (await db("userlogin").where("UserID", uid))[0]
          .TestID;
        if (testIDArray.indexOf(parseInt(testID)) == -1) check = false;
      }
    }
    if (check) {
      const test = (await db("test").where("TestID", testID))[0];
      result = {
        generalInformation: test,
        error: "none",
      };
    } else
      result = {
        generalInformation: {},
        error: "Not permission",
      };
    //console.log(result);
    return result;
  },

  async getTestByID(testID, type, uid) {
    let check = true;
    var result;
    console.log(type);
    if (type == "developer") {
      const test = (await db("test").where("TestID", testID))[0];
      console.log(test);
      if (test.Permissions == "private") {
        console.log(uid);
        const testIDArray = (await db("userlogin").where("UserID", uid))[0]
          .TestID;
        if (testIDArray.indexOf(parseInt(testID)) == -1) check = false;
      }
    }
    console.log(check);
    if (check) {
      const test = (await db("test").where("TestID", testID))[0];
      const listQuestion = (
        await db.raw(`call getQuestionList('${test.TestID}')`)
      )[0][0];

      result = {
        generalInformation: test,
        listQuestion: listQuestion,
        error: "none",
      };
    } else
      result = {
        generalInformation: {},
        listQuestion: [],
        error: "Not permission",
      };
    //console.log(result);
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
  async getTestBySet(set, uid) {
    const list = (await db.raw(`call getTestSet ('${uid}', '${set}')`))[0][0];
    return list;
  },
  async updateTest(test, testID) {
    var moment = require("moment");
    test.generalInformation.QuestionID = JSON.stringify(
      test.generalInformation.QuestionID
    );
    test.generalInformation.listUser = JSON.stringify(
      test.generalInformation.listUser
    );
    delete test.generalInformation.CreatedAt;
    delete test.generalInformation.UpdatedAt;
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
                MCCoding: question.CodeSample,
              });
            } else if (question.QuestionType == "Code") {
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
              MCCoding: question.CodeSample,
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
  async getTestWithoutAnswer(testID) {
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
      } else if (question.QuestionType == "Code") {
        const codeQuestion = (
          await db("coding").where("QuestionID", question.ID)
        )[0];
        res.Description = codeQuestion.CodeDescription;
        res.CodeSample = codeQuestion.CodeSample;
        res.Language_allowed = codeQuestion.Language_allowed;
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
  async getAnswer(testID) {
    const test = (await db("test").where("TestID", testID))[0];
    const listQuestionID = test.QuestionID;
    const listQuestion = [];
    for (const item of listQuestionID) {
      const question = (await db("question").where("ID", item))[0];
      var res = {};
      res.ID = question.ID;
      res.QuestionType = question.QuestionType;
      res.Score = question.Score;
      res.Method = question.Method;
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
    var result = listQuestion;

    return result;
  },
  async getRanking(testID) {
    return (
      await db.raw(`select submissions.TestID, CorrectPercent, DoingTime, Score, submissions.CreatedAt, UserName 
    from submissions 
    inner join userlogin
    on UserID = DevID
    where submissions.TestID = ${testID}
    order by Score DESC, DoingTime ASC;`)
    )[0];
  },
  async getListInvite(testID) {
    const result = (await db("test").where("TestID", testID))[0].listUser;
    if (!result) return [];
    return result;
  },
  async updateListInvite(testID, listEmail) {
    const temp = (await db("test").where("TestID", testID))[0];
    const oldList = temp.listUser || [];
    const finalList = listEmail.filter((x) => !oldList.includes(x));
    console.log(finalList, testID)
    await db.raw(
      `call updatePermission('${JSON.stringify(finalList)}', ${testID})`
    );
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "group7.17clc@gmail.com",
        pass: "group7.17clc",
      },
    });
    var CryptoJS = require("crypto-js");

    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(
      testID.toString(),
      "secret key 12345"
    ).toString();
    var mailOptions;
    for (const e of finalList) {
      mailOptions = {
        from: "group7.17clc@gmail.com",
        to: e,
        subject: "[no-reply] New invite",
        html: `<h2>You have a new invitation to access a test</h2> 
    <p>Here are your code to access it: <b>${temp.TestCode}</b> </p>
    <p>You can access quickly by the link below:</p>
    <p>codejoyfe.me/developer/test/questions?key=Avx&x=${ciphertext}</p>
    <hr/>
    <p>Best,</p>
    <p>CodeJoy Team</p>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
  },
};
