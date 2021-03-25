const db = require('../utils/db');

module.exports = {
  async getPracticeList(set){
    return await db('practice').where('PracticeSet', set);
  },
  async getSubmissions(pid, uid){
    return await db('submissions').where({'PracticeID':pid, 'DevID':uid})
  },
  async saveSubmissions(data){
    return await db('submissions').insert(data)
  },
}