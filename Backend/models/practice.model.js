const db = require('../utils/db');

module.exports = {
  async getAllPractice(){
    return await db('practice');
  },

  async getPracticeList(set){
    return await db('practice').where('PracticeSet', set);
  },

  async getPracticeByLevel(level){
    return await db('practice').where('DifficultLevel', level);
  },

  async getSubmissions(pid, uid){
    return await db('submissions').where({'PracticeID':pid, 'DevID':uid})
  },
  
  async saveSubmissions(data){
    return await db('submissions').insert(data)
  },
  async getAnswerMultipleChoice(list){
    const ans = await db("multiplechoice").where("QuestionID", "in", list)
    let temp = {}
    ans.forEach(i => {
      let tmp = {}
      tmp.list = []
      i.CorrectAnswer.forEach(j=>{
        tmp.list.push(i.Answer[j])
      })
      temp[i.QuestionID] = tmp
    });
    return temp;
  },
  async saveAnswerCoding(data){
    return await db('answercoding').insert(data)
  },
  async saveAnswerMultipleChoice(data){
    return await db('answermultiplechoice').insert(data)
  },
  async getIndexMultipleChoice(qid, list){
    const ans = await db("multiplechoice").where("QuestionID", "=", qid)
    let temp = []
    ans[0]?.Answer.forEach((item ,i)=>{
      list.forEach(listItem=>{
        if(item === listItem)
          temp.push(i)
      })
    })
    return temp;
  },
  async getQuestionID(ID){
    return await db('practice').where('PracticeID', ID);
  },
}