const db = require('../utils/db');


module.exports = {
  async getAllPractice(){
    return await db('practice');
  },

  async getPracticeList(uid, set){
    return (await db.raw(`call getPracticeSet('${uid}', '${set}')`))[0][0];
  },

  async getPracticeByLevel(level){
    return await db('practice').where('DifficultLevel', level);
  },

  async getSubmissions(pid, uid){
    const list = await db('submissions').where({'PracticeID':pid, 'DevID':uid})
    let result = []
    for (item of list) {
    let tempItem = item
    // if (item.SubmissionType === "MultipleChoice") {
    //   let temp = await submissionsModel.getAnswerMultipleChoiceSubmission(item.SubmissionID)
    //   tempItem.Answer = temp
    //   console.log(tempItem)
      
    // } else {
    //   let temp = await submissionsModel.getAnswerCodingSubmission(item.SubmissionID)

    //   let testcases  = JSON.stringify(temp[0]?.OutputTestcase)
    //   let tmp = {
    //     source_code:temp[0]?.DescriptionCode,
    //     testcases: testcases
    //   }
    //   item.Answer = tmp
    // }
    result.push(tempItem)
  };
  return JSON.parse(JSON.stringify(result))
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
    ans[0].Answer.forEach((item ,i)=>{
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