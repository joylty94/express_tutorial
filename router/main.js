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
}