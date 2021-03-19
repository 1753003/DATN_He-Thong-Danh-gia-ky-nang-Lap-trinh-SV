const db = require('../utils/db');

module.exports = {
  async createUserDeveloper(uid, rftoken, email, pwd) {
    await db('userlogin').insert({
        UserID: uid,
        UserName: email,
        UserPwd: pwd,
        UserType: "developer",
        UserStatus: 'not active',
        RefreshToken: rftoken,
    })
    return uid;
  },
  async createUserCreator(uid, rftoken, email, pwd) {
    await db('userlogin').insert({
        UserID: uid,
        UserName: email,
        UserPwd: pwd,
        UserType: "creator",
        UserStatus: 'not active',
        RefreshToken: rftoken,
    })
    return uid;
  },
  async getByEmail(email) {
      const list = await db('userlogin').where('UserName', email);
      return list[0];
  },
  async updateCode(uid, code) {
      await db('userlogin').where('UserID', uid).update('Code',code);
  },

  async updateStatus(uid, status) {
    db('userlogin').where('UserID',uid).update('UserStatus', status)
  },
  
  async updateRefreshToken(uid, token) {
    await db('userlogin').update('RefreshToken',token).where('UserID',uid);
  },
  
  async getByUID(uid) {
    const list = await db('userlogin').where('UserID', uid);
    return list[0];
  },

  async getAll() {
      return await db('userlogin')
  }
}