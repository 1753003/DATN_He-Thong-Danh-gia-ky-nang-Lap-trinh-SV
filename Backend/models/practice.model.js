const db = require('../utils/db');

module.exports = {
  async getAllPractice(){
    return await db('practice');
  },

  async getPracticeList(set){
    //return await db('practice').where('PracticeSet', set);
    return await db.raw(`select * from practice where PracticeSet = "${set}"`);
  },

  async getPracticeByLevel(level){
    //return await db('practice').where('PracticeSet', set);
    return await db.raw(`select * from practice where DifficultLevel = "${level}"`);
  }
}