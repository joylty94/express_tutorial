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
            res.render('home.html')
        } else {
            res.redirect('/')
        }
    })
    // app.get('/persons', function (req, res) {

    //     connection.query('SELECT * from Persons', function (err, rows) {
    //         if (err) throw err;

    //         console.log('The solution is: ', rows);
    //         res.send(rows);
    //     });
    // });
}