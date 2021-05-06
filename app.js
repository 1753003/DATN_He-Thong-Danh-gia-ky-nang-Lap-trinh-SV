const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

var cors = require('cors')

const app = express();
app.use(express.json());

app.use(morgan('dev'));
const WEB = process.env.WEB || 'http://localhost:8000';
app.use(cors({ credentials: true, origin: WEB}));
app.use(cookieParser()); 
// const csrfProtection = csrf({
//     cookie: true
//   });
const auth = require('./middleware/authDeveloper.mdw');

app.get('/', function(req, res) {
    res.json("Running...");
})

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/token', auth, require('./routes/token.route'))
app.use('/api/creator', auth, require('./routes/creator.route'))
app.use('/api/practice', auth, require('./routes/practice.route'))
app.use('/api/test', auth, require('./routes/test.route'))
app.use('/api/submissions', auth, require('./routes/submissions.route'))
app.use('/api/search', auth, require('./routes/search.route'))
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Backend is runnning at http://localhost:${PORT}`);
})