const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


var cors = require('cors')
var bodyParser = require('body-parser');

const app = express();
app.use(express.json());

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cors({credentials: true}));
app.use(cookieParser()); 

const auth = require('./middleware/authDeveloper.mdw');

app.get('/', function(req, res) {
    res.json("Running...");
})

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/token', auth, require('./routes/token.route'))
app.use('/api/creator', auth, require('./routes/creator.route'))
app.use('/api/practice', auth, require('./routes/practice.route'))
app.use('/api/test', auth, require('./routes/test.route'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
    console.log(`Backend is runnning at http://localhost:${PORT}`);
})