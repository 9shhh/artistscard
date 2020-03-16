const loginJob = require('../../controllers/account/jobs/login');

exports.index = (req, res) => {
    res.render('account/login');
};

exports.signIn = async (req, res) => {
    const check = await loginJob.isEqualPw(req.body);

    if (check.isBoolean) {
        req.session.userId = req.body.id;
        res.redirect('/main');
    } else {
        const msg = check.msg;
        const maintainId = req.body.id
        res.render('account/login', { msg, maintainId });
    }
};

exports.signOut = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};