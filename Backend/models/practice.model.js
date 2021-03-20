const db = require('../utils/db');

module.exports = {
  async getPracticeList(set){
    return await db('practice').where('PracticeSet', set);
  }
}