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
}