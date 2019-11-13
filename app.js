const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const db = require('./db/index');
// var mysql = require('mysql');
// var dbconfig = require('./config/database.js');
// var connection = mysql.createConnection(dbconfig);
var sequelize = require('./models/index').sequelize;
const app = express();
sequelize.sync();

// var router = require('./router/main')(app, fs, connection);
var router = require('./router/main')(app, fs);
var api = require('./api/index')();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
db();

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => { // 404 처리 부분
    res.status(404).send('일치하는 주소가 없습니다!');
});
app.use((err, req, res, next) => { // 에러 처리 부분
    console.error(err.stack); // 에러 메시지 표시
    res.status(500).send('서버 에러!'); // 500 상태 표시 후 에러 메시지 전송
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});