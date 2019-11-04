module.exports = function (app, fs) {
    app.get('/', function (req, res) {
        res.render('login.html')
    });
    app.get('/login', function (req, res) {
        res.render('login.html');
    });
    app.get('/home', (req, res) => {
        res.render('home.html')
    })
    app.get('/api/list', (req, res) => {
        fs.readFile( __dirname + "/../data/users.json", 'utf8', function (err, data){
            //console.log(data);
            var users = JSON.parse(data)
            res.json(users);
            //res.json(data);
        });
    })
}