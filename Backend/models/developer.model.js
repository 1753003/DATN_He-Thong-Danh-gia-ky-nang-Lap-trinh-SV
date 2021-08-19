const db = require("../utils/db");

module.exports = {
  async get(id) {
    return (await db("developer").where("UserID", id))[0];
  },
  async update(id, data) {
    await db("developer").where("UserID", id).update(data);
  },
  async getInviteList(uid) {
    return (await db.raw(`call getInviteTest ('${uid}')`))[0][0];
  },
  async getAnswerSheet(uid, testID) {
    const res = (
      await db.raw(`select answermultiplechoice.Choice,
		answermultiplechoice.Point,
        multiplechoice.MCDescription as Description,
        multiplechoice.Answer,
        multiplechoice.CorrectAnswer,
        multiplechoice.MCCoding as CodeSample,
        question.QuestionType,
        question.Score
        from answermultiplechoice, submissions, multiplechoice, question
        where submissions.DevID = '${uid}'
        and submissions.SubmissionID = answermultiplechoice.SubmissionID
        and answermultiplechoice.QuestionID = multiplechoice.QuestionID
        and submissions.TestID = ${testID}
        and question.ID = multiplechoice.QuestionID`)
    )[0];
    const res2 = (
        await db.raw(`
        select answercoding.Point,
	    answercoding.TestCasePassed,
        answercoding.OutputTestcase,
        coding.CodeDescription as Description,
        coding.CodeSample,
        question.QuestionType,
        question.Score,
        answercoding.DescriptionCode
        from answercoding, coding, submissions, question
        where submissions.SubmissionID = answercoding.SubmissionID
        and submissions.DevID = '${uid}'
        and answercoding.QuestionID = question.ID
        and question.ID = coding.QuestionID
        and submissions.TestID = ${testID}`)
    )[0];
    return res.concat(res2);
  },
};
