const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = express('fs')
var router = require('./router/main')(app, fs);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('views', __dirname + '/src');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


app.post('/api/signin', (req, res) => {
    const { username, userpass } = req.body;
    if(username == 'user' && userpass == 'pass'){
        res.json({'result': 'sucess'})
        //res.redirect('home.html')
    }else{
        res.json({'result': 'fail'});
    }
});

app.listen(3000, () => console.log('Server Start'));

app.use(express.static('public'));