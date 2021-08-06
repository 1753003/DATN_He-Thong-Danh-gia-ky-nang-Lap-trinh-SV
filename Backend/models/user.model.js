const db = require('../utils/db');

module.exports = {
  async createUserDeveloper(uid, email, type, status, image, name) {
    await db('userlogin').insert({
        UserID: uid,
        UserName: email,
        UserPwd: '',
        UserType: type,
        UserStatus: status,
    })
    await db('developer').insert({
      UserID: uid,
      DevImage: image,
      DevName: name,
      DevMail: email,
    })
    return uid;
  },
  async createUserCreator(uid, email, type, status, image, name ) {
    await db('userlogin').insert({
      UserID: uid,
      UserName: email,
      UserPwd: '',
      UserType: type,
      UserStatus: status,
  })
  await db('creator').insert({
    UserID: uid,
    CreatorImg: image,
    CreatorName: name,
    BusinessMail: email
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