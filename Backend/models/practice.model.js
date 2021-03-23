const db = require('../utils/db');

module.exports = {
    async getPracticeList(){
        return await db('practice');
    },

    async getPracticeList(set){
        return await db('practice').where('PracticeSet', set);
    }
}