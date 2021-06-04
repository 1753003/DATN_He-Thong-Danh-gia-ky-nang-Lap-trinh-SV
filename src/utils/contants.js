const Constant = {
  CORS:
    process.env.NODE_ENV === 'production' ? 'https://codejoy-fe.herokuapp.com' : 'http://localhost:8000',
  API:
    process.env.NODE_ENV === 'production'
      ? 'http://3.0.40.66:5000'
      : 'http://localhost:5000',
};

export default Constant;
