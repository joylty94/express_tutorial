const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));

app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}));

app.post('/api/signin', (req, res) => {
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
    sess = req.session;
    if (sess.username) {
        req.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        })
    } else {
        res.redirect('/');
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

app.listen(3000, () => console.log('Server Start'));

var router = require('./router/main')(app, fs);