const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.post('/api/signin', (req, res) => {
    const { username, userpass } = req.body;
    if(username == 'user' && userpass == 'pass'){
        res.json({'result': 'sucess'})
    }else{
        res.json({'result': 'fail'});
    }
});

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

app.use(express.static('public'));

var router = require('./router/main')(app, fs);