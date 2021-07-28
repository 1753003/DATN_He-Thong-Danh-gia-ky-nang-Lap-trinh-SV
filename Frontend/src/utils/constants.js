const Constant = {
  CORS: process.env.NODE_ENV === 'production' ? 'https://codejoyfe.me' : 'http://localhost:8000',
  API: process.env.NODE_ENV === 'production' ? 'https://be.codejoyfe.me' : 'http://localhost:5000',
  JUDGE:
    process.env.NODE_ENV === 'production' ? 'https://be.codejoyfe.me' : 'https://be.codejoyfe.me',
  MIN_SCREEN_WIDTH: 768,
};

export default Constant;
