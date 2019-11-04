module.exports = function (app, fs) {
    app.get('/', function (req, res) {
        var sess;
        sess = req.session;
        if(sess.userid){
            res.redirect('/home')
        }else{
            res.render('login.html')
        }
    });
    app.get('/login', function (req, res) {
        var sess;
        sess = req.session;
        if (sess.userid) {
            sess.redirect('/home')
        } else {
            res.render('login.html')
        }
    });
    app.get('/home', (req, res) => {
        var sess;
        sess = req.session;
        if (sess.userid) {
            res.redirect('/home')
        } else {
            res.render('home.html')
        }
    })
}