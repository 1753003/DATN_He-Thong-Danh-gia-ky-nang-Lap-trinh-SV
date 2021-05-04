const db = require('../utils/db');

module.exports = {
    async getEmailByUid(uid){
        return (await db('userlogin').where('UserID', uid))[0].UserName;
    },

}