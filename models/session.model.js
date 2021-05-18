const db = require('../utils/db');

module.exports = {
  async checkSession(UserID, TestID, Timed) {
      const res = await db('session').where({
          UserID,
          TestID
      })

      if (res.length == 0) {
        await db('session').insert({
            UserID,
            TestID,
            Timed
         })
        return null;
      }
      else 
        return res[0].Timed;
        
  },
  async deleteSession(UserID, TestID) {
      await db('session').where({UserID, TestID}).del();
  }
}