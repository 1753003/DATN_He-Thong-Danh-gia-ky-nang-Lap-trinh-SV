const db = require('../utils/db');

module.exports = {
  async getPracticeQuestionList(ID){
    return (await db('practice').where('PracticeID', ID))[0];
  },
  async getSolvedStatus(list){
    return (await db('submissions').where('PracticeID', ID));
  },
  async getPracticeQuestionListDetail(ID){
    const list = await this.getPracticeQuestionList(ID);
    const listDetail = [];
    for (const id of list.QuestionID) {
      console.log(id);
      const question = (await db('question').where('ID', id))[0];
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
        listDetail.push(res);
    }
    var result = {
      "generalInformation": list,
      "listQuestion": listDetail
  }
  return result;
  },
  async getQuestionCoding(ID){
    return await db('coding').where('QuestionID', ID);
  },
  async getQuestionMultiChoice(ID){
    return await db('multiplechoice').where('QuestionID', ID);
  },
}