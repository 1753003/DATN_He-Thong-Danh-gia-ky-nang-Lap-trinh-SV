const db = require('../utils/db');

module.exports = {
  async getResult(keyword, uid) {
      const list = (await db.raw(`call search ('${keyword}')`))[0][0];

      for (item of list) {
        var isSubmission;
        if (item.IsPratice)
          isSubmission = (await db.raw(`select SubmissionID 
                                          from submissions 
                                          where PracticeID = '${item.ID}'
                                                and DevID = '${uid}'`))[0]
        else
          isSubmission = (await db.raw(`select SubmissionID 
                                        from submissions 
                                        where TestID = '${item.ID}'
                                              and DevID = '${uid}'`))[0];
        console.log(isSubmission.length)
        if (isSubmission.length == 0)
          item.isSolve = false;
        else 
          item.isSolve = true;
      }
      return list;
  }
}