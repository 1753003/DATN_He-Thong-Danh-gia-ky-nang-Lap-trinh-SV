const db = require('../utils/db');

module.exports = {
  async getPracticeQuestionList(ID){
    return await db('question').where('PracticeID', ID);
  },
  async getPracticeQuestionListDetail(ID){
    const list = await this.getPracticeQuestionList(ID);
    for (const iterator of list) {
      console.log(iterator)
    }
  },
  async getQuestionCoding(ID){
    return await db('coding').where('QuestionID', ID);
  },
  async getQuestionMultiChoice(ID){
    return await db('multiplechoice').where('QuestionID', ID);
  },
}