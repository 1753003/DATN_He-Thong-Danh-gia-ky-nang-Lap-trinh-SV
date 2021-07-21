const db = require("../utils/db");

module.exports = {
  async getPracticeSubmissions(id) {
    return (
      await db.raw(`select s.*, p.PracticeName, p.DifficultLevel, p.Score as MaxScore, p.PracticeSet
        from submissions s inner join practice p on s.PracticeID = p.PracticeID
        where s.DevID = "${id}";`)
    )[0];
  },

  async getTestSubmissions(id) {
    const res = await db("submissions")
      .join("test", "submissions.TestID", "=", "test.TestID")
      .where({ DevID: id, PracticeID: null });

    for (item of res) {
      if (item.Permissions == "public") item.isPublic = true;
      else item.isPublic = false;
      if (item.Score < item.PassScore) item.isPass = false;
      else item.isPass = true;
    }
    return res;
  },
  async postTestSubmission(uid, submission) {
    await db("submissions")
      .insert({
        SubmissionType: "MultipleChoice",
        TestID: submission.TestID,
        PracticeID: null,
        DevID: uid,
        AnsweredNumber: submission.AnsweredNumber,
        CorrectPercent: submission.CorrectPercent,
        DoingTime: submission.DoingTime,
        Score: submission.Score,
      })
      .then(async (SubmissionID) => {
        const ID = SubmissionID[0];
        for (item of submission.ListAnswer) {
          console.log(item.Type)
          if (item.Type === "MultipleChoice") {
            await db("answermultiplechoice").insert({
              SubmissionID: ID,
              QuestionID: item.QuestionID,
              Choice: JSON.stringify(item.Choice),
            });
          } else if (item.Type === "Code") {
            console.log(item)
            await db("answercoding").insert({
              SubmissionID: ID,
              QuestionID: item.QuestionID,
              TestCasePassed: JSON.stringify(item.TestCasePassed),
              DescriptionCode: item.DescriptionCode,
              UsedLanguage: item.UsedLanguage,
              RunningTime: item.RunningTime,
              MemoryUsage: item.MemoryUsage,
              OutputTestcase: JSON.stringify(item.OutputTestcase),
            });
          }
        }
      });
  },

  async saveSubmissionAnswerMultipleChoice(data) {
    return db("answermultiplechoice").insert(data);
  },

  async checkExist(DevID, TestID) {
    const res = await db("submissions").where({ DevID, TestID });
    if (res.length == 0) return false;
    return true;
  },

  async getAnswerCodingSubmission(sid) {
    return db("answercoding").where("SubmissionID", sid);
  },

  async getAnswerMultipleChoiceSubmission(sid) {
    return db("answermultiplechoice").where("SubmissionID", sid);
  },

  async getStatics(TestID) {
    return (await db.raw(`select count(*) as Num, test.PassScore, test.MaxScore, report.PercentSuccess, report.PercentPass
    from submissions
    inner join test
    on test.TestID = ${TestID}
    inner join report
    on report.TestID = ${TestID}
   where submissions.testID = ${TestID}`))[0][0];
  },
};
