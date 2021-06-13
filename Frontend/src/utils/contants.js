const Constant = {
  CORS:
    process.env.NODE_ENV === 'production' ? 'https://codejoy-fe.herokuapp.com' : 'http://localhost:8000',
  API:
    process.env.NODE_ENV === 'production'
      ? 'https://codejoy-fe.herokuapp.com'
      : 'http://localhost:5000',
  JUDGE: process.env.NODE_ENV === 'production'
  ? 'https://codejoy-fe.herokuapp.com'
  : 'http://3.0.40.66:2358',
};

export default Constant;
