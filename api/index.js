module.exports = () => {
    app.post('/api/login', (req, res) => {
        var sess;
        sess = req.session;

        fs.readFile(__dirname + "/data/users.json", 'utf8', function (err, data) {
            const { userid, userpass } = req.body;
            var filelist = fs.readdirSync('./data');
            var users = JSON.parse(data);
            var result = {}
            // console.log(filelist)
            // console.log(users)
            if (!users[userid]) {
                result['success'] = 0;
                result['error'] = "not found";
                res.json(result);
                return;
            }

            if (users[userid]["password"] == userpass) {
                result['success'] = 1;
                sess.userid = userid;
                sess.name = users[userid]["name"];
                res.json(result);
                return;
            } else {
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

    app.post('/api/signup', function (req, res) {
        const { userid, userpass, username } = req.body;
    })
}