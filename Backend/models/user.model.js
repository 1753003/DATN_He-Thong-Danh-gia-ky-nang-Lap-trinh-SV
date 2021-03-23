const db = require('../utils/db');

module.exports = {
  async createUserDeveloper(uid, email, type, status ) {
    await db('userlogin').insert({
        UserID: uid,
        UserName: email,
        UserPwd: '',
        UserType: type,
        UserStatus: status,
    })
    return uid;
  },
  async createUserCreator(uid, email, type, status ) {
    await db('userlogin').insert({
      UserID: uid,
      UserName: email,
      UserPwd: '',
      UserType: type,
      UserStatus: status,
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