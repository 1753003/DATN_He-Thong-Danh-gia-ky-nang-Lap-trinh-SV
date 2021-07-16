const Constant = {
  CORS:
    process.env.NODE_ENV === 'production' ? 'https://codejoyfe.me' : 'http://localhost:8000',
  API:
    process.env.NODE_ENV === 'production'
      ? 'https://be.codejoyfe.me'
      : 'http://localhost:5000',
  JUDGE: process.env.NODE_ENV === 'production'
  ? 'https://codejoy-fe.herokuapp.com'
  : 'https://codejoy-fe.herokuapp.com',
};

export default Constant;
