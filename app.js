const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const redis = require('redis');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
// var mysql = require('mysql');
// var dbconfig = require('./config/database.js');
// var connection = mysql.createConnection(dbconfig);
var sequelize = require('./models/index').sequelize;
const app = express();
sequelize.sync();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true,
}));

app.post('/api/login', (req, res) => {
    var sess;
    sess = req.session;

    fs.readFile(__dirname + "/data/users.json", 'utf8', function(err, data){
        const { userid, userpass } = req.body;
        var filelist = fs.readdirSync('./data');
        var users = JSON.parse(data);
        var result = {}
        // console.log(filelist)
        // console.log(users)
        if(!users[userid]){
            result['success'] = 0;
            result['error'] = "not found";
            res.json(result);
            return;
        }

        if(users[userid]["password"] == userpass){
            result['success'] = 1;
            sess.userid = userid;
            sess.name = users[userid]["name"];
            res.json(result);
            return;
        }else{
            result["success"] = 0;
            result["error"] = "incorrect";
            res.json(result);
        }
    })
});

app.get('/api/logout', function (req, res) {
    var sess;
    sess = req.session;
    var result = {}
    if (sess.userid) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
                result["success"] = 0;
                result["error"] = err;
                res.json(result)
            } else {
                result["success"] = 1;
                res.json(result)
            }
        })
    }
})

app.get('/api/list', (req, res) => {
    fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data)
        res.json(users);
    });
})

app.get('/api/getUser/:username', function (req, res) {
    fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        res.json(users['users'][req.params.username]);
    });
});

app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});

// var router = require('./router/main')(app, fs, connection);
var router = require('./router/main')(app, fs);