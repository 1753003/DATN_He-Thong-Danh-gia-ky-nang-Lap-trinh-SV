const db = require("../utils/db");
const { getTestByID } = require("./test.model");

module.exports = {
  async getList(uid) {
    return (await db.raw(`call getQuestionBank ('${uid}')`))[0][0];
  },

  async getByID(id) {
    let result = (await db.raw(`
        select question.ID as ID,
        QuestionType,
        Score,
        case 
            when MCDescription is not null 
            then MCDescription
            when CodeDescription is not null
            then CodeDescription
        end as Description,
        Answer,
        CorrectAnswer,
        case
            when CodeDescription is not null
            then CodeSample
            when MCDescription is not null
            then MCCoding
        end as CodeSample,
        TestCase,
        MemoryUsage,
        RunningTime,
        Language_allowed
        from question
        left join multiplechoice
        on multiplechoice.questionID = question.ID
        left join coding    
        on coding.questionID = question.ID
        where question.ID = ${id};
        `))[0][0];
    if (result.CodeSample == null)
        result.CodeSample = "";
    if (result.Language_allowed == null)
        result.Language_allowed = []
    return result;
  }
};
