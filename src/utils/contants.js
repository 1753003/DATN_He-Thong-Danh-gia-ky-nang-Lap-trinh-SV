const Constant = {
  CORS:
    process.env.NODE_ENV === 'production' ? 'https://devcheckpro.web.app' : 'http://localhost:8000',
  API:
    process.env.NODE_ENV === 'production'
      ? 'https://codejoy.herokuapp.com'
      : 'http://localhost:5000',
};

export default Constant;
